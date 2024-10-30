const source = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json';

// Initialise the map
const map = new maplibregl.Map({
  container: 'map',
  style: '../js/roads-basemap-with-terrain-3d.json',
  center: [-82.2315, 35.7583],
  zoom: 8.17
});

const layers = ['fbv-nc','nw-nc','foot-nc','sw-nc','sw-fbv','etn','e-nw-nc','ssw-nc','e-us']

map.on('load', () => {
  map.addControl(new maplibregl.NavigationControl());

  // Select all elements with the class 'maplibregl-ctrl-top-right'
  let elements = document.querySelectorAll('.maplibregl-ctrl-top-right ');

  // Iterate over the selected elements and change their CSS
  elements.forEach(element => {
    element.style.right = '1.3vh'
    element.style.top = '7vh'
    element.boxShadow = '0 0 1vh black'
  });

  map.addSource('main-source', {
    'type': 'image',
    'url': `../data/helene/Clippedmask_0.png`, // Initial date
    'coordinates': [
      [-83.6473, 37.5228],
      [-80.7288, 37.5228],
      [-80.7288, 34.7698],
      [-83.6473, 34.7698]
    ],
  });

  map.addLayer({
    'id': 'main-layer',
    'type': 'raster',
    'source': 'main-source',
    'paint': {
      'raster-opacity': 1,
      'raster-fade-duration': 0,
      'raster-resampling': "nearest"
    }
  }, 'boundary_county');

  // map.addSource('fbv-nc-source', {
  //   'type': 'image',
  //   'url': `../data/helene/FBVNCFloat_0.png`, // Initial date
  //   'coordinates': [
  //     [-83.22262, 36.14088],
  //     [-81.99027, 36.14088],
  //     [-81.99027, 35.13499],
  //     [-83.22262, 35.13499]
  //   ],
  // });
  //
  // map.addLayer({
  //   'id': 'fbv-nc-layer',
  //   'type': 'raster',
  //   'source': 'fbv-nc-source',
  //   'paint': {
  //     'raster-opacity': 1,
  //     'raster-fade-duration': 0,
  //     'raster-resampling': "nearest"
  //   }
  // }, 'boundary_county');

  // map.addSource('nw-nc-source', {
  //   'type': 'image',
  //   'url': `../data/helene/NWNCFloat_0.png`, // Initial date
  //   'coordinates': [
  //     [-82.12493, 37.04658],
  //     [-80.89024, 37.04658],
  //     [-80.89024, 36.05157],
  //     [-82.12493, 36.05157]
  //   ],
  // });
  //
  // map.addLayer({
  //   'id': 'nw-nc-layer',
  //   'type': 'raster',
  //   'source': 'nw-nc-source',
  //   'paint': {
  //     'raster-opacity': 1,
  //     'raster-fade-duration': 0,
  //     'raster-resampling': "nearest"
  //   }
  // }, 'boundary_county');
  //
  // map.addSource('foot-nc-source', {
  //   'type': 'image',
  //   'url': `../data/helene/FootNCFloat_0.png`, // Initial date
  //   'coordinates': [
  //     [-82.1119, 36.1449],
  //     [-80.8915, 36.1449],
  //     [-80.8915, 35.1499],
  //     [-82.1119, 35.1499]
  //   ],
  // });
  //
  // map.addLayer({
  //   'id': 'foot-nc-layer',
  //   'type': 'raster',
  //   'source': 'foot-nc-source',
  //   'paint': {
  //     'raster-opacity': 1,
  //     'raster-fade-duration': 0,
  //     'raster-resampling': "nearest"
  //   }
  // }, 'boundary_county');
  //
  // map.addSource('sw-nc-source', {
  //   'type': 'image',
  //   'url': `../data/helene/SWNCFloat_0.png`, // Initial date
  //   'coordinates': [
  //     [-84.3324, 36.1262],
  //     [-83.0879, 36.1262],
  //     [-83.0879, 35.1101],
  //     [-84.3324, 35.1101]
  //   ],
  // });
  //
  // map.addLayer({
  //   'id': 'sw-nc-layer',
  //   'type': 'raster',
  //   'source': 'sw-nc-source',
  //   'paint': {
  //     'raster-opacity': 1,
  //     'raster-fade-duration': 0,
  //     'raster-resampling': "nearest"
  //   }
  // }, 'boundary_county');
  //
  // map.addSource('sw-fbv-source', {
  //   'type': 'image',
  //   'url': `../data/helene/SWFBVFloat_0.png`, // Initial date
  //   'coordinates': [
  //     [-83.1975, 35.2390],
  //     [-81.9795, 35.2390],
  //     [-81.9795, 34.2337],
  //     [-83.1975, 34.2337]
  //   ],
  // });
  //
  // map.addLayer({
  //   'id': 'sw-fbv-layer',
  //   'type': 'raster',
  //   'source': 'sw-fbv-source',
  //   'paint': {
  //     'raster-opacity': 1,
  //     'raster-fade-duration': 0,
  //     'raster-resampling': "nearest"
  //   }
  // }, 'boundary_county');
  //
  // map.addSource('etn-source', {
  //   'type': 'image',
  //   'url': `../data/helene/ETNFloat_0.png`, // Initial date
  //   'coordinates': [
  //     [-83.2484, 37.0422],
  //     [-82.0014, 37.0422],
  //     [-82.0014, 36.0361],
  //     [-83.2484, 36.0361]
  //   ],
  // });
  //
  // map.addLayer({
  //   'id': 'etn-layer',
  //   'type': 'raster',
  //   'source': 'etn-source',
  //   'paint': {
  //     'raster-opacity': 1,
  //     'raster-fade-duration': 0,
  //     'raster-resampling': "nearest"
  //   }
  // }, 'boundary_county');
  //
  // map.addSource('e-nw-nc-source', {
  //   'type': 'image',
  //   'url': `../data/helene/ENWNCFloat_0.png`, // Initial date
  //   'coordinates': [
  //     [-81.0002, 37.0466],
  //     [-79.7655, 37.0466],
  //     [-79.7655, 36.0505],
  //     [-81.0002, 36.0505]
  //   ],
  // });
  //
  // map.addLayer({
  //   'id': 'e-nw-nc-layer',
  //   'type': 'raster',
  //   'source': 'e-nw-nc-source',
  //   'paint': {
  //     'raster-opacity': 1,
  //     'raster-fade-duration': 0,
  //     'raster-resampling': "nearest"
  //   }
  // }, 'boundary_county');
  //
  // map.addSource('ssw-nc-source', {
  //   'type': 'image',
  //   'url': `../data/helene/SSWNCFloat_0.png`, // Initial date
  //   'coordinates': [
  //     [-84.8289, 35.2231],
  //     [-83.5980, 35.2231],
  //     [-83.5980, 34.2068],
  //     [-84.8289, 34.2068]
  //   ],
  // });
  //
  // map.addLayer({
  //   'id': 'ssw-nc-layer',
  //   'type': 'raster',
  //   'source': 'ssw-nc-source',
  //   'paint': {
  //     'raster-opacity': 1,
  //     'raster-fade-duration': 0,
  //     'raster-resampling': "nearest"
  //   }
  // }, 'boundary_county');
  //
  // map.addSource('e-us-source', {
  //   'type': 'image',
  //   'url': `../data/helene/EUSFloat_0.png`, // Initial date
  //   'coordinates': [
  //     [-82.0995, 35.24307],
  //     [-80.8927, 35.24307],
  //     [-80.8927, 34.2481],
  //     [-82.0995, 34.2481]
  //   ],
  // });
  //
  // map.addLayer({
  //   'id': 'e-us-layer',
  //   'type': 'raster',
  //   'source': 'e-us-source',
  //   'paint': {
  //     'raster-opacity': 1,
  //     'raster-fade-duration': 0,
  //     'raster-resampling': "nearest"
  //   }
  // }, 'boundary_county');
})

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

const updateDamageLayerOpacity = () => {
    const sliderValue = document.getElementById('damage-opacity-slider').value;
    console.log(sliderValue)
    layers.forEach(layer => {
      console.log(`${layer}-layer`)
      console.log(parseFloat(sliderValue))
      map.setPaintProperty(`${layer}-layer`, 'raster-opacity', parseFloat(sliderValue));
    })
}

// Add event listener to the toggle button
document.getElementById('opacity-toggle').addEventListener('click', toggleSliderContainer);
document.getElementById('legend-toggle').addEventListener('click', toggleLegendContainer);

// Add event listener to the slider to update the layer opacity
document.getElementById('damage-opacity-slider').addEventListener('input', updateDamageLayerOpacity);