const mapWidth = window.innerWidth;  // 100vw in pixels
const mapHeight = window.innerHeight; // 100vh in pixels

const gridToMapPixel = (gridX, gridY) => {
  const gridWidth = regionData[0].length; // 1200
  const gridHeight = regionData.length;  // 641

  const pxX = (gridX / gridWidth) * mapWidth;
  const pxY = (gridY / gridHeight) * mapHeight;
  return [pxX, pxY];
}

const mapPixelToWebMercator = (pxX, pxY, bbox) => {
  const { xmin, ymin, xmax, ymax } = bbox;

  const lon = xmin + (pxX / mapWidth) * (xmax - xmin);
  const lat = ymax - (pxY / mapHeight) * (ymax - ymin);
  return [lon, lat];
}

const transformContoursToGeoJSON = (contours, bbox) => {
  const features = contours.map(contour => {
    const coordinates = contour.coordinates.map(polygon => {
      return polygon.map(ring => {
        return ring.map(([gridX, gridY]) => {
          const [pxX, pxY] = gridToMapPixel(gridX, gridY);
          return mapPixelToWebMercator(pxX, pxY, bbox);
        });
      });
    });

    return {
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: coordinates,
      },
      properties: {
        value: contour.value,
      },
    };
  });

  return {
    type: 'FeatureCollection',
    features: features,
  };
}

const cleanLevels = () => {
  finalLevels = []
  let skip = false
  levels.forEach((level, i) => {
    if (!skip) {
      if (level > levels[i+1]) {
        finalLevels.push((level + levels[i+1]) / 2)
        skip = true
      } else if (level == levels[i+1]) {
        skip = true
        finalLevels.push(level)
      } else {
        finalLevels.push(level)
      }
    } else {
      skip = false
    }
  });
  return finalLevels
}


const generateContours = () => {
  document.getElementById('middle').style.display = 'none'

  console.log(levels)
  levels = cleanLevels(levels)
  console.log(levels)

  // Flatten regionData into a single Float32Array
  const flatData = new Float32Array(regionData.length * regionData[0].length);
  regionData.forEach((row, index) => {
    flatData.set(row, index * regionData[0].length); // Copy each row into the correct position
  });

  const gridWidth = regionData[0].length;  // Number of columns
  const gridHeight = regionData.length;   // Number of rows

  // Initialize the contour generator
    const contourGenerator = d3.contours()
      .size([gridWidth, gridHeight]) // Grid dimensions
      .thresholds(levels); // Define contour levels

    // Generate contours
    const contours = contourGenerator(flatData);

    const extentBbox = {
      xmin: regionBounds._sw.lng, // Replace with your map's bounding box values
      ymin: regionBounds._sw.lat,
      xmax: regionBounds._ne.lng,
      ymax: regionBounds._ne.lat
    };

    const geoJSONContours = transformContoursToGeoJSON(contours, extentBbox);

    // Create a Blob from the GeoJSON data
    const blob = new Blob([JSON.stringify(geoJSONContours)], { type: 'application/json' });

    // Create an anchor element and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'contours.geojson';
    link.click();

    // Clean up the object URL after the download is triggered
    URL.revokeObjectURL(link.href);

    console.log(geoJSONContours)

    map.addSource('contours', {
      type: 'geojson',
      data: geoJSONContours,
    });

    map.addLayer({
      id: 'contour-layer',
      type: 'fill',
      source: 'contours',
      paint: {
        'fill-color': ['interpolate', ['linear'], ['get', 'value'], 0, 'blue', 10, 'red'],
        'fill-opacity': 0.5,
        'fill-outline-color': 'white',
      }
    }, 'terrain');
}

let selectedVertex = null; // To store the currently selected vertex
let polygonLayer = null; // The polygon layer that will be modified

// Function to enable clicking and moving vertices
function enableVertexMoving() {
  const layerId = 'contour-layer'
  polygonLayer = map.getLayer(layerId); // Get the polygon layer by ID

  // Listen for map click events
  map.on('click', (e) => {
    const features = map.queryRenderedFeatures(e.point, { layers: [layerId] });

    if (features.length > 0) {
      const feature = features[0]; // The clicked feature
      const coords = feature.geometry.coordinates;

      // Find the closest vertex to the clicked point
      const closestVertex = findClosestVertex(coords, e.lngLat);

      console.log(closestVertex)

      if (selectedVertex === null) {
        // If no vertex is selected, select the closest one
        selectedVertex = closestVertex;
        selectedVertex.isSelected = true; // Mark the selected vertex
        updatePolygonLayer(coords); // Update the polygon layer with the selected vertex
      } else {
        // If a vertex is already selected, move it to the clicked location
        moveVertex(selectedVertex, e.lngLat);
        updatePolygonLayer(coords); // Update the polygon layer with the moved vertex
        selectedVertex = null; // Deselect the vertex
      }
    }
  });

  let vertexDotLayerId = 'vertex-dot-layer';
  let hoverDotSourceId = 'vertex-dot-source';

  map.on('mousemove', (e) => {
    const features = map.queryRenderedFeatures(e.point, { layers: [layerId] });
    if (features.length > 0) {
      let closestVertex = null;
      let minDistance = Infinity;

      // Loop through all features and find the closest vertex
      features.forEach(feature => {
        const coords = feature.geometry.coordinates;

        // Check each vertex in the feature (could be a polygon or multipolygon)
        coords.forEach(ring => {
          ring.forEach(vertex => {
            if (vertex.length > 1) {
              vertex = vertex[0]
            }
            const distance = e.lngLat.distanceTo(new maplibregl.LngLat(vertex[0], vertex[1]));
            if (distance < minDistance) {
              minDistance = distance;
              closestVertex = { vertex, feature, ring, index: ring.indexOf(vertex) };
            }
          });
        });
      });

      // If a vertex is found, show the red dot
      if (closestVertex) {
        const vertex = closestVertex.vertex;
        const vertexCoordinates = { type: 'Point', coordinates: [vertex[0], vertex[1]] };

        const radius = 1; // kilometer
        const options = {
            steps: 64,
            units: 'kilometers'
        };
        const circle = turf.circle(vertexCoordinates, radius, options);

        // Add or update the red dot layer
        if (!map.getSource(hoverDotSourceId)) {
          map.addSource(hoverDotSourceId, {
            type: 'geojson',
            data: circle
          });

          map.addLayer({
            id: vertexDotLayerId,
            type: 'fill',
            source: hoverDotSourceId,
            paint: {
                'fill-color': 'red',
                'fill-opacity': 1
            }
          });
        } else {
          const radius = 1; // kilometer
          const options = {
              steps: 64,
              units: 'kilometers'
          };
          const circle = turf.circle(vertexCoordinates, radius, options);

          map.getSource(hoverDotSourceId).setData(circle);
        }
      } else {
        // If no features are found, remove the red dot layer
        if (map.getSource(hoverDotSourceId)) {
          map.removeLayer(vertexDotLayerId);
          map.removeSource(hoverDotSourceId);
        }
      }
    }
  });

  map.on('mouseleave', (e) => {
    if (map.getSource(hoverDotSourceId)) {
      map.removeLayer(vertexDotLayerId);
      map.removeSource(hoverDotSourceId);
    }
  });
}

// Function to find the closest vertex to the clicked point
function findClosestVertex(coords, point) {
  let minDistance = Infinity;
  let closestVertex = null;

  // Loop through the polygon's coordinates (assuming the first ring is the exterior)
  coords.forEach((ring, ringIndex) => {
    ring.forEach((vertex, index) => {

      if (vertex.length > 1) {
        vertex = vertex[0]
      }

      const distance = point.distanceTo(new maplibregl.LngLat(vertex[0], vertex[1]));
      if (distance < minDistance) {
        minDistance = distance;
        closestVertex = { vertex, index };
      }
    });
  });

  return closestVertex;
}

// Function to move the selected vertex to a new location
function moveVertex(selectedVertex, newPoint) {
  const { index, vertex } = selectedVertex;
  // Update the selected vertex's position
  vertex[0] = newPoint.lng;
  vertex[1] = newPoint.lat;
}

// Function to update the polygon layer with the new coordinates
function updatePolygonLayer(coords) {
  map.getSource('polygon-source').setData({
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: coords,
      },
    }],
  });
}
