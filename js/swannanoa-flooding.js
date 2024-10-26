const source = 'https://mapscdn.ngs.noaa.gov/maps/hybrid/style.json';

// Initialise the map
const map = new maplibregl.Map({
  container: 'map',
  style: '../js/noaa-satellite-basemap.json',
  center: [-82.3923,35.6022],
  maxBounds: [-82.41357860258921, 35.59428129648903, -82.37105317540306, 35.60931855025633]
});

map.on('load', () => {

  var detailsElement = document.querySelector('.mapboxgl-compact-show');
  if (detailsElement) {
        detailsElement.removeAttribute('open');
        detailsElement.classList.remove('maplibregl-compact-show', 'mapboxgl-compact-show');
    }

  // Define the raster source
  map.addSource('20241005a_RGB', {
      'type': 'raster',
      'tiles': [
          'https://stormscdn.ngs.noaa.gov/20241005a-rgb/{z}/{x}/{y}'
      ],
      'tileSize': 256,
      'minzoom': 0,
      'maxzoom': 20,
      'bounds': [-83.4876, 35.32490003, -81.62489943, 36.2376]
  });

  // Add the raster layer
  map.addLayer({
      'id': '20241005a_RGB-layer',
      'type': 'raster',
      'source': '20241005a_RGB',
      'paint': {
          'raster-opacity': 1.0
      }
  }, 'road');

  map.addSource('flood-source', {
    'type': 'geojson',
    'data': '../data/helene/Swannanoa-Flooding-Contours-Feet.geojson'
  });

  map.addLayer({
    'id': 'flood-layer',
    'type': 'fill',
    'source': 'flood-source',
    'paint': {
      'fill-color': [
        "match",
        ["get", "ELEV_MAX"],
        // 14,"#020922",
        // 13,"#031033",
        // 12,"#031643",
        // 11,"#041d54",
        // 10,"#052464",
        30,"#01030a",
        27,"#020922",
        24,"#031033",
        21,"#031643",
        18,"#041d54",
        15,"#0f377c",
        12,"#2f5a91",
        9,"#5a92be",
        6,"#6faed5",
        3,"#9bcde8",
        0,"#deeef7",
        "grey"
      ],
      'fill-opacity': 0.5
    }
  }, 'road');

  map.addSource('building-source', {
    'type': 'geojson',
    'data': '../data/helene/Swannanoa-Buildings-Feet.geojson'
  })

  map.addLayer({
    'id': 'building-layer',
    'type': 'fill',
    'source': 'building-source',
    'paint': {
      'fill-color': [
        "step",
        ["get", "_mean"],
        "grey",
        0.001, '#ffffb2',
        3.8188976, '#fecc5c',
        7.6181102, '#fd8d3c',
        11.420604, '#f03b20',
        15.219816, '#bd0026'
      ],
      'fill-opacity': 1
    }
  }, 'road')
})

// Function to toggle the visibility of the slider container
const toggleSliderContainer = () => {
    const sliderContainer = document.getElementById('opacity-slider-container');
    if (sliderContainer.style.display === 'none' || sliderContainer.style.display === '') {
        sliderContainer.style.display = 'block';
    } else {
        sliderContainer.style.display = 'none';
    }
}

const toggleLegendContainer = () => {
    const sliderContainer = document.getElementById('legend-slider-container');
    if (sliderContainer.style.display === 'none' || sliderContainer.style.display === '') {
        sliderContainer.style.display = 'block';
    } else {
        sliderContainer.style.display = 'none';
    }
}

// Function to update the opacity of the 'flood-layer'
const updateFloodLayerOpacity = () => {
    const sliderValue = document.getElementById('flood-opacity-slider').value;
    map.setPaintProperty('flood-layer', 'fill-opacity', parseFloat(sliderValue));
}

const updateBuildingLayerOpacity = () => {
    const sliderValue = document.getElementById('building-opacity-slider').value;
    map.setPaintProperty('building-layer', 'fill-opacity', parseFloat(sliderValue));
}

// Add event listener to the toggle button
document.getElementById('opacity-toggle').addEventListener('click', toggleSliderContainer);
document.getElementById('legend-toggle').addEventListener('click', toggleLegendContainer);

// Add event listener to the slider to update the layer opacity
document.getElementById('flood-opacity-slider').addEventListener('input', updateFloodLayerOpacity);
document.getElementById('building-opacity-slider').addEventListener('input', updateBuildingLayerOpacity);

// Add the click event listener for the 'building-layer'
// map.on('click', 'building-layer', function (e) {
//     // Check if the clicked feature has the _mean attribute
//     if (e.features.length && e.features[0].properties._mean !== undefined) {
//         // Get the coordinates of the clicked feature
//         const coordinates = e.lngLat;
//         // Get the _mean attribute value
//         const meanValue = e.features[0].properties._mean;
//
//         // Ensure the coordinates are set correctly for the popup
//         while (Math.abs(coordinates[0] - e.lngLat.lng) > 180) {
//             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//         }
//
//         // Create a popup and set its content and position
//         new maplibregl.Popup()
//             .setLngLat(coordinates)
//             .setHTML(`<strong>Estimated Flood Depth:</strong> ${meanValue.toFixed(1)}'`)
//             .addTo(map);
//     }
// });

// Change the cursor to pointer when hovering over the 'building-layer'
map.on('mouseenter', 'building-layer', function () {
    map.getCanvas().style.cursor = 'pointer';
});

// Change the cursor back to default when not hovering over the 'building-layer'
map.on('mouseleave', 'building-layer', function () {
    map.getCanvas().style.cursor = '';
});
