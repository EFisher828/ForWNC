let activeBasemap = 'esri_light_gray'

const map = (window.map = new maplibregl.Map({
  container: 'map',
  style: `./${activeBasemap}.json`, // base map style
  center: [-96, 37.9], // map center coordinates
  zoom: 4, // initial zoom level
  maxPitch: 85,
  attributionControl: false
}));

map.on('click', (e) => {
    // Get the clicked point
    const point = [e.point.x, e.point.y];

    // Query for the rendered features at the clicked point
    const features = map.queryRenderedFeatures(point);

    if (features.length) {
        // Log the layer IDs of the features beneath the click
        features.forEach((feature) => {
            console.log('Layer ID:', feature.layer.id);
        });
    } else {
        console.log('No features found at the clicked point.');
    }
});

const addForecast = () => {
  // Add a source and layer for the polygon
  map.addSource('fcst-src', {
    type: "geojson",
    data: './data/forecast/20250109-v2-smoothed.geojson'
  });

  map.addLayer({
    id: 'fcst-layer',
    type: "fill",
    source: 'fcst-src',
    paint: {
      "fill-color": [
        'match',
        ['get', 'id'],
        5, 'red',
        4, 'purple',
        3, 'blue',
        2, 'green',
        1, 'yellow',
        0, 'white',
        'transparent' // Default color if 'id' doesn't match any class
      ],
      "fill-opacity": 1,
    },
  }, 'terrain');
}

document.getElementById('middleClose').addEventListener('click', () => {
  document.getElementById('middle').style.display = 'none'
})

const collectMeta = () => {
  document.getElementById('middle').style.display = 'block'
}

let levels = [0, 0.01, 0.01, 1, 1, 3, 2, 4, 3, 6, 6, 100]
document.getElementById('addLevelButton').addEventListener('click', () => {
  const bottomLevel = parseFloat(document.getElementById('bottomLevel').value)
  const topLevel = parseFloat(document.getElementById('topLevel').value)
  document.getElementById('bottomLevel').value = ''
  document.getElementById('topLevel').value = ''
  levels.push(bottomLevel)
  levels.push(topLevel)
  document.getElementById('snowLevels').innerHTML += `
    <div class="snowLevelContainer">
      <p>${bottomLevel} to ${topLevel}"</p>
    </div>
  `
});
