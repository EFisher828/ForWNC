const source = 'https://mapscdn.ngs.noaa.gov/maps/hybrid/style.json';

// Initialise the map
const map = new maplibregl.Map({
  container: 'map',
  style: '../js/roads-basemap-with-terrain.json',
  center: [-82.3923,35.6022],
  zoom: 12
});

map.on('load', () => {
  map.addSource('buncombe-tiles', {
    type: 'raster',
    tiles: [
      'https://gis.buncombecounty.org/arcgis/rest/services/Images_2024_posthelene/ImageServer/tile/{z}/{y}/{x}'
    ],
    tileSize: 256, // Typical tile size
  });

  map.addLayer({
    id: 'buncombe-layer',
    type: 'raster',
    source: 'buncombe-tiles',
    paint: {}
  }); //'boundary_county'
});
