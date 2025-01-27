const toggleNBM = (e) => {
  console.log(e.target.checked)
  if (!e.target.checked) {
    map.removeLayer('raster-layer')
    map.removeSource('raster-src')
  } else {
    activeDataset = 'nbm'
    activeVar = 'asnow'
    cmap = variables[activeVar].cmap
    bins = variables[activeVar].bins

    changeModel(activeDataset)
  }
}

let activeDataset;
let activeVar;
let dateTimes;
let cmap;
let bins;
let cmapType = 'discrete'
let fetching = false
let regionData;
let regionBounds;

const changeModel = async (model) => {
  activeDataset = model

  if (!Object.keys(datasets[model].variables).includes(activeVar)) {
    activeVar = Object.keys(datasets[model].variables)[0]
    cmap = variables[activeVar].cmap
    bins = variables[activeVar].bins
  }

  dateTimes = generateDateTimes(datasets[activeDataset].variables[activeVar], datasets[activeDataset].intervalHours, datasets[activeDataset].totalIntervals);
  bbox = datasets[activeDataset].bbox;

  ll_merc = latLonToWebMercator(bbox.south, bbox.west)
  ul_merc = latLonToWebMercator(bbox.north, bbox.east)

  bbox_merc = {
    'west': ll_merc.x,
    'east': ul_merc.x,
    'north': ul_merc.y,
    'south': ll_merc.y
  }

  lonArrMerc = Array.from({ length: datasets[activeDataset].cols }, (_, i) => bbox_merc.west + i * (bbox_merc.east - bbox_merc.west) / (datasets[activeDataset].cols - 1));
  latArrMerc = Array.from({ length: datasets[activeDataset].rows }, (_, j) => bbox_merc.north - j * (bbox_merc.north - bbox_merc.south) / (datasets[activeDataset].rows - 1));

  await fetchData(`https://monarchweatherenterprise.com/mv3/general/data/${activeDataset}/${activeVar}/${dateTimes[dateTimes.length-1]}.pbf.gz`)
}

const generateDateTimes = (startTime, intervalHours, totalIntervals) => {
  const formatDate = (date) => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}`;
  }

  // Create a new Date object from the start time
  let currentTime = new Date(startTime);
  let dateTimes = [];

  // Iterate to generate the required datetime objects
  for (let i = 0; i < totalIntervals; i++) {
    // Add the current time to the array
    dateTimes.push(formatDate(currentTime));

    // Increment the current time by the interval in hours
    currentTime.setHours(currentTime.getHours() + intervalHours);
  }

  return dateTimes;
}

const latLonToWebMercator = (lat, lon) => {
  // Earth's radius in meters
  const R = 6378137;

  // Convert longitude from degrees to radians
  const x = lon * (Math.PI / 180) * R;

  // Convert latitude from degrees to radians and apply the Web Mercator formula
  const y = Math.log(Math.tan((Math.PI / 4) + (lat * (Math.PI / 180) / 2))) * R;

  return { x: x, y: y };
}

const webMercatorToLatLon = (x, y) => {
  // Earth's radius in meters
  const R = 6378137;

  // Convert x (meters) to longitude (degrees)
  const lon = (x / R) * (180 / Math.PI);

  // Convert y (meters) to latitude (degrees)
  const lat = (Math.atan(Math.exp(y / R)) - (Math.PI / 4)) * (2 * 180 / Math.PI);

  return { lat: lat, lon: lon };
}

const fetchData = async (path) => {
  const response = await fetch(path);
  const arrayBuffer = await response.arrayBuffer();

  // Decompress the data using pako (a gzip library for JavaScript)
  const decompressedData = pako.inflate(new Uint8Array(arrayBuffer));

  protobuf.load("2darray.proto", function(err, root) {
    if (err) {
      throw err;
    }

    // Obtain the message type
    const Array2D = root.lookupType("Array2D");

    // Decode the PBF data
    const message = Array2D.decode(decompressedData);

    // Convert to a plain object
    const object = Array2D.toObject(message, {
      longs: String,
      enums: String,
      bytes: String,
    });

    // Access the 2D array
    const array2D = object.rows.map(row => row.values);
    addData(array2D)
  });
}

const getColorForValue = (value, colorMapType) => {
  if (colorMapType === 'discrete') {
    // Discrete color map
    for (let i = 0; i < bins.length - 1; i++) {
      if (value >= bins[i] && value < bins[i + 1]) {
        return cmap[i];
      }
    }
    return cmap[cmap.length - 1]; // For values >= last bin
  } else if (colorMapType === 'continuous') {
    // Continuous color map
    for (let i = 0; i < bins.length - 1; i++) {
      if (value >= bins[i] && value < bins[i + 1]) {
        const ratio = (value - bins[i]) / (bins[i + 1] - bins[i]);
        if (cmap[i] === '#000000' || cmap[i + 1] === '#000000') {
          // Skip interpolation if any of the colors is '#000000'
          return cmap[i];
        }
        return interpolateColor(cmap[i], cmap[i + 1], ratio);
      }
    }
    return cmap[cmap.length - 1]; // For values >= last bin
  }
};

const interpolateColor = (color1, color2, ratio) => {
  const hex = (color) => {
    return parseInt(color.replace('#', ''), 16);
  };

  const r1 = (hex(color1) >> 16) & 0xff;
  const g1 = (hex(color1) >> 8) & 0xff;
  const b1 = hex(color1) & 0xff;

  const r2 = (hex(color2) >> 16) & 0xff;
  const g2 = (hex(color2) >> 8) & 0xff;
  const b2 = hex(color2) & 0xff;

  const r = Math.round(r1 + ratio * (r2 - r1));
  const g = Math.round(g1 + ratio * (g2 - g1));
  const b = Math.round(b1 + ratio * (b2 - b1));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
};

const createRasterImage = (data2D, width, height, colorMapType = 'discrete') => {
  // console.log(width, height)
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const imageData = ctx.createImageData(width, height);
  const pixels = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = data2D[y][x];
      const color = getColorForValue(value, colorMapType);

      hex = color.replace('#', '');

      // Parse the hex string into RGB components
      let r = parseInt(hex.substring(0, 2), 16);
      let g = parseInt(hex.substring(2, 4), 16);
      let b = parseInt(hex.substring(4, 6), 16);
      let a = 255

      if ((r + g + b) == 0) {
        a = 0
      }

      const index = (y * width + x) * 4;
      pixels[index] = r;
      pixels[index + 1] = g;
      pixels[index + 2] = b;
      pixels[index + 3] = a; // alpha channel
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

let popupExists = false
const addData = (d2d) => {
  activeWidth = d2d[0].length
  activeHeight = d2d.length
  activeData = d2d

  manageRegion();

  if (!popupExists) {
    // Add a popup
    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: [0, -15]
    });

    map.on('mousemove', (e) => {
      map.getCanvas().style.cursor = 'pointer'

      const mouse_coords = latLonToWebMercator(e.lngLat.lat, e.lngLat.lng)
      const lonSpan = bbox_merc.east - bbox_merc.west;
      const latSpan = bbox_merc.north - bbox_merc.south;

      // Normalize the lngLat to the coordinate space of the bounding box
      const normalizedX = (mouse_coords.x - bbox_merc.west) / lonSpan;  // Longitude normalized to [0, 1]
      const normalizedY = (bbox_merc.north - mouse_coords.y) / latSpan;  // Latitude normalized to [0, 1]

      // Convert to the 2D array index space (scaled by the size of the array)
      const x = Math.floor(normalizedX * activeWidth);  // Map normalized X to the width of the 2D array
      const y = Math.floor(normalizedY * activeHeight);    // Map normalized Y to the height of the 2D array

      // Ensure the x and y values are within bounds
      if (x >= 0 && x < activeWidth && y >= 0 && y < activeHeight) {
          let value = activeData[y][x];  // Get the value from the array
          let ptype;
          if (['ref','ptype'].includes(activeVar)) {
            ptype = ptypeDict[parseInt(Math.floor(value / 100))]
            value = value - (100 * Math.floor(value / 100))
          }

          let html_str = `<div id="popup-container"><p class="popup-row">${e.lngLat.lat.toFixed(2)}°N, ${e.lngLat.lng.toFixed(2)}°E</p><hr /><p class="popup-row">${variables[activeVar].label}: ${isNaN(value) ? 'No data' : value.toFixed(variables[activeVar].fixed)}${variables[activeVar].units}</p>`

          if (['ref','ptype'].includes(activeVar)) {
            if ((value < 1 && activeVar == 'ref') || (value < 0.01 && activeVar == 'ptype')) { ptype = 'None' }
            html_str += `<p class="popup-row">Precipitation Type: ${isNaN(value) ? 'No data' : ptype}</p>`
          }

          html_str += `</div>`

          popup.setLngLat(e.lngLat)
              .setHTML(html_str)
              .addTo(map);
      }
    });

    map.on('mouseout', () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });

    popupExists = true
  }


  map.on('moveend', async (e) => {
    if (!fetching) {
      console.log('moving')
      fetching = true
      await manageRegion()
      fetching = false
    }
  });
}

const bilinearInterpolate = (x, y, v00, v10, v01, v11, centralValue, threshold) => {
    const isWithinThreshold = (value) => Math.abs(value - centralValue) < threshold;

    const validV00 = isWithinThreshold(v00) ? v00 : 0;
    const validV10 = isWithinThreshold(v10) ? v10 : 0;
    const validV01 = isWithinThreshold(v01) ? v01 : 0;
    const validV11 = isWithinThreshold(v11) ? v11 : 0;

    const weights00 = isWithinThreshold(v00) ? (1 - x) * (1 - y) : 0;
    const weights10 = isWithinThreshold(v10) ? x * (1 - y) : 0;
    const weights01 = isWithinThreshold(v01) ? (1 - x) * y : 0;
    const weights11 = isWithinThreshold(v11) ? x * y : 0;

    const sumWeights = weights00 + weights10 + weights01 + weights11;
    const value = (validV00 * weights00 + validV10 * weights10 + validV01 * weights01 + validV11 * weights11) / (sumWeights || 1);

    return value;
};

const upscale2DBilinear = (data, scaleFactor) => {
  const threshold = variables[activeVar].itrthreshold;
  const srcHeight = data.length;
  const srcWidth = data[0].length;
  const destHeight = Math.floor(srcHeight * scaleFactor);
  const destWidth = Math.floor(srcWidth * scaleFactor);

  const upscaledData = new Array(destHeight);

  for (let i = 0; i < destHeight; i++) {
      upscaledData[i] = new Float32Array(destWidth);
  }

  for (let destY = 0; destY < destHeight; destY++) {
      for (let destX = 0; destX < destWidth; destX++) {
          const srcX = destX / scaleFactor;
          const srcY = destY / scaleFactor;
          const x0 = Math.floor(srcX);
          const x1 = Math.min(x0 + 1, srcWidth - 1);
          const y0 = Math.floor(srcY);
          const y1 = Math.min(y0 + 1, srcHeight - 1);

          const xWeight = srcX - x0;
          const yWeight = srcY - y0;

          // Ensure srcX and srcY are within bounds
          const centralX = Math.min(Math.max(Math.round(srcX), 0), srcWidth - 1);
          const centralY = Math.min(Math.max(Math.round(srcY), 0), srcHeight - 1);

          const centralValue = data[centralY][centralX];
          const a = data[y0][x0];
          const b = data[y0][x1];
          const c = data[y1][x0];
          const d = data[y1][x1];

          const value = bilinearInterpolate(xWeight, yWeight, a, b, c, d, centralValue, threshold);

          upscaledData[destY][destX] = value;
      }
  }

  return upscaledData;
}

const clipIndices = (index, test) => {
  if (index > test) {
    return test - 1
  } else if (index < 0) {
    return 0
  } else {
    return index
  }
}

const clipBounds = (bounds) => {
  if (bounds._sw.lng < bbox.west) {
    bounds._sw.lng = bbox.west
  }
  if (bounds._sw.lat < bbox.south) {
      bounds._sw.lat = bbox.south
  }
  if (bounds._ne.lng > bbox.east) {
    bounds._ne.lng = bbox.east
  }
  if (bounds._ne.lat > bbox.north) {
    bounds._ne.lat = bbox.north
  }

  return bounds
}

const extractSubsection = (startX, endX, startY, endY) => {

  // Determine the number of rows and columns in the subsection
  const numRows = endY - startY;
  const numCols = endX - startX;

  // Pre-allocate the subsection array
  const subsection = new Array(numRows);

  let min = Infinity;
  let max = -Infinity;
  let sum = 0;
  let count = 0;

  for (let i = 0; i < numRows; i++) {
    const row = activeData[startY + i];
    const rowSlice = row.slice(startX, endX + 1); // Use slice for compatibility
    subsection[i] = rowSlice;

    for (let j = 0; j < rowSlice.length; j++) {
      let value = rowSlice[j];
      if (['ref','ptype'].includes(activeVar)) {
        value = value - (100 * Math.floor(value / 100))
      }
      if (value < min) min = value;
      if (value > max) max = value;
      sum += value;
      count++;
    }
  }

  const mean = sum / count;

  return subsection;
}

const manageRegion = async () => {
  let bounds = map.getBounds()
  console.log(bounds)

  bounds._sw.lng -= 0.1
  bounds._sw.lat -= 0.1
  bounds._ne.lng += 0.1
  bounds._ne.lat += 0.1

  const reg_ll_coords = latLonToWebMercator(bounds._sw.lat, bounds._sw.lng)
  const reg_ul_coords = latLonToWebMercator(bounds._ne.lat, bounds._ne.lng)

  const lonSpan = bbox_merc.east - bbox_merc.west;
  const latSpan = bbox_merc.north - bbox_merc.south;

  // Normalize the lngLat to the coordinate space of the bounding box
  const reg_ll_x_norm = (reg_ll_coords.x - bbox_merc.west) / lonSpan;
  const reg_ll_y_norm = (bbox_merc.north - reg_ll_coords.y) / latSpan;
  const reg_ul_x_norm = (reg_ul_coords.x - bbox_merc.west) / lonSpan;
  const reg_ul_y_norm = (bbox_merc.north - reg_ul_coords.y) / latSpan;

  // Convert to the 2D array index space (scaled by the size of the array)
  const reg_ll_x = clipIndices(Math.floor(reg_ll_x_norm * activeWidth), activeWidth);
  const reg_ll_y = clipIndices(Math.floor(reg_ll_y_norm * activeHeight), activeHeight);
  const reg_ul_x = clipIndices(Math.floor(reg_ul_x_norm * activeWidth), activeWidth);
  const reg_ul_y = clipIndices(Math.floor(reg_ul_y_norm * activeHeight), activeHeight);

  // console.log(reg_ll_x, reg_ul_x, reg_ul_y, reg_ll_y)

  regionData = extractSubsection(reg_ll_x, reg_ul_x, reg_ul_y, reg_ll_y)
  let regionWidth = regionData[0].length
  let regionHeight = regionData.length

  if (regionWidth < 1200) {
    // console.log('upscaling')
    regionData = upscale2DBilinear(regionData, 1200 / regionWidth)
    regionWidth = regionData[0].length
    regionHeight = regionData.length
  }

  // console.log(bounds)

  bounds = {
    '_sw': {'lng': webMercatorToLatLon(lonArrMerc[reg_ll_x], 0).lon, 'lat': webMercatorToLatLon(0,latArrMerc[reg_ll_y]).lat},
    '_ne': {'lng': webMercatorToLatLon(lonArrMerc[reg_ul_x], 0).lon, 'lat': webMercatorToLatLon(0,latArrMerc[reg_ul_y]).lat},
  }

  // console.log(bounds)

  const clippedBounds = clipBounds(bounds)

  regionBounds = clippedBounds

  // console.log(clippedBounds)

  // Need to add conditional such that raster-source is updated ONCE when bounds exceed raster bounds - ensuring full raster displays. No further updates after first update if bounds still exceed raster extent.
  if (map.getSource('raster-source') !== undefined && (bounds._sw.lng > bbox.west || bounds._sw.lat > bbox.south || bounds._ne.lng < bbox.east || bounds._ne.lat < bbox.north)) {
    map.getSource('raster-source').updateImage({
      url: createRasterImage(regionData, regionWidth, regionHeight, cmapType), // variables[activeVar].
      coordinates: [
        [clippedBounds._sw.lng, clippedBounds._ne.lat],
        [clippedBounds._ne.lng, clippedBounds._ne.lat],
        [clippedBounds._ne.lng, clippedBounds._sw.lat],
        [clippedBounds._sw.lng, clippedBounds._sw.lat]
      ]
    });
    fullView = false
  } else if (map.getSource('raster-source') !== undefined && !fullView) {
    map.getSource('raster-source').updateImage({
      url: createRasterImage(regionData, regionWidth, regionHeight, cmapType),
      coordinates: [
        [clippedBounds._sw.lng, clippedBounds._ne.lat],
        [clippedBounds._ne.lng, clippedBounds._ne.lat],
        [clippedBounds._ne.lng, clippedBounds._sw.lat],
        [clippedBounds._sw.lng, clippedBounds._sw.lat]
      ]
    });
    fullView = true
  } else if (map.getSource('raster-source') == undefined) {
    // Add raster image source
    map.addSource('raster-source', {
      type: 'image',
      url: createRasterImage(regionData, regionWidth, regionHeight, cmapType),
      coordinates: [
        [clippedBounds._sw.lng, clippedBounds._ne.lat], // top-left corner coordinates
        [clippedBounds._ne.lng, clippedBounds._ne.lat], // top-right corner coordinates
        [clippedBounds._ne.lng, clippedBounds._sw.lat], // bottom-right corner coordinates
        [clippedBounds._sw.lng, clippedBounds._sw.lat]  // bottom-left corner coordinates
      ]
    });

    // await map.moveLayer("terrain", "Special area of interest/Water");

    // Add raster layer
    map.addLayer({
      id: 'raster-layer',
      type: 'raster',
      source: 'raster-source',
      paint: {
        'raster-resampling': "nearest",
        'raster-opacity': 1
      }
    }, "terrain");

  }
}
