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
