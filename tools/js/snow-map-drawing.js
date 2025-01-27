let allPolgyons = {}
let coordinates;
let uid;
let color;
let polygonSourceId;

const collectMeta = () => {
  document.getElementById('middle').style.display = 'block'
}

const colors = ['#AEDFF0','#85B5EF','#5A83C9','#5562B4','#A482E5','#CC9EEC','#E5BEEC','#EF9FB9','#EF88A6']
const submitMeta = () => {
  const uid_meta = document.getElementById('uid').value
  const title_meta = document.getElementById('title').value

  if (uid_meta.includes('_')) {
    color = colors[uid_meta.split('_')[0]]
  } else {
    color = colors[uid_meta]
  }

  if (!allPolgyons[uid_meta]) {
    allPolgyons[uid_meta] = {
      'title': title_meta,
      'coordinates': [
        []
      ],
      'color': color
    }
    document.getElementById('topRight').innerHTML += `<div class="polygonLayer" id="layer-${uid_meta}"><div class="colorFill" id="colorFill${uid_meta}" onclick="toggleColorFill(${uid_meta})"></div><div class="polgyonColor" style="background:${color};"></div><p>${title_meta}</p></div></div>`
  } else {
    allPolgyons[uid_meta].coordinates.push([])
  }


  enablePolygonDrawing(uid_meta)

  document.getElementById('middle').style.display = 'none'
}

const toggleColorFill = (id) => {
  if (toString(id).includes('_')) {
    color = colors[id.split('_')[0]]
  } else {
    color = colors[id]
  }

  if (map.getLayer(`polygon-${id}-line`)) {
    document.getElementById(`colorFill${id}`).style.background = 'white'
    map.removeLayer(`polygon-${id}-line`)
    map.setPaintProperty(`polygon-${id}`, 'fill-color', color);
  } else {
    document.getElementById(`colorFill${id}`).style.background = 'rgba(0, 0, 0, 0)'
    map.setPaintProperty(`polygon-${id}`, 'fill-color', 'rgba(0, 0, 0, 0)');

    map.addLayer({
      id: `polygon-${id}-line`,
      type: "line",
      source: `polygon-${id}`,
      paint: {
        "line-color": color,
        "line-width": 4,
      },
    }, 'terrain');
  }
}

const addVertices = (e) => {
  const { lng, lat } = e.lngLat;
  coordinates.push([lng, lat]);

  // Close the polygon if double-clicked near the starting point
  if (coordinates.length > 2) {
    const firstPoint = coordinates[0];
    const distance = Math.sqrt(
      Math.pow(lng - firstPoint[0], 2) + Math.pow(lat - firstPoint[1], 2)
    );
    if (distance < 0.005) {
      coordinates.push(firstPoint); // Close the polygon
      map.off("click"); // Stop listening for more points
      alert("Polygon completed!");
    }
  }

  // Update the GeoJSON data
  map.getSource(polygonSourceId).setData({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: allPolgyons[uid].coordinates,
        },
      },
    ],
  });
}

const enablePolygonDrawing = (uid_meta) => {
  uid = uid_meta
  if (uid.includes('_')) {
    color = colors[uid.split('_')[0]]
  } else {
    color = colors[uid]
  }
  coordinates = allPolgyons[uid].coordinates[allPolgyons[uid].coordinates.length - 1];
  polygonSourceId = `polygon-${uid}`;

  if (!map.getSource(polygonSourceId)) {
    // Add a source and layer for the polygon
    map.addSource(polygonSourceId, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    });

    map.addLayer({
      id: polygonSourceId,
      type: "fill",
      source: polygonSourceId,
      paint: {
        "fill-color": color,
        "fill-opacity": 1,
      },
    }, 'terrain');
  }

  map.on("click", addVertices);
}

const finishDrawing = () => {
  alert('Done Drawing')
  map.off("click", addVertices);
}

const smoothPolygon = (iterations = 1) => {
  console.log('Smoothing!')
  function chaikin(points) {
    const smoothed = [];
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];

      // Calculate new points
      const q = [
        0.75 * p0[0] + 0.25 * p1[0], // x-coordinate
        0.75 * p0[1] + 0.25 * p1[1], // y-coordinate
      ];
      const r = [
        0.25 * p0[0] + 0.75 * p1[0], // x-coordinate
        0.25 * p0[1] + 0.75 * p1[1], // y-coordinate
      ];

      smoothed.push(q, r);
    }
    smoothed.push(points[points.length - 1]); // Add the last point
    return smoothed;
  }

  let smoothedCoordinates = coordinates;
  for (let i = 0; i < iterations; i++) {
    smoothedCoordinates = chaikin(smoothedCoordinates);
  }

  let fullCoordinates = allPolgyons[uid].coordinates

  fullCoordinates[fullCoordinates.length - 1] = smoothedCoordinates

  // Update the GeoJSON data
  map.getSource(polygonSourceId).setData({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: fullCoordinates,
        },
      },
    ],
  });
  // return smoothedCoordinates;
}
