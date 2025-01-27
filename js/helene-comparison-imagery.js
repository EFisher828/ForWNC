// 'Before' style from https://github.com/lukasmartinelli/naturalearthtiles
var before = new maplibregl.Map({
  container: "before",
  style: "../js/noaa-satellite-basemap.json",
  center: [-82.3923,35.6022],
  zoom: 12
});

// 'After' style from https://github.com/maplibre/demotiles
var after = new maplibregl.Map({
  container: "after",
  style: "../js/simple-no-background-basemap.json",
  center: [-82.3923,35.6022],
  zoom: 12
});

after.on('load', () => {
  after.addSource('after-tiles', {
    type: 'raster',
    tiles: [
      'https://gis.buncombecounty.org/arcgis/rest/services/Images_2024_posthelene/ImageServer/tile/{z}/{y}/{x}'
    ],
    tileSize: 256,
    attribution: "<a href='https://gis.buncombecounty.org'>Buncombe County Gov</a>"
  });

  after.addLayer({
    id: 'after-layer',
    type: 'raster',
    source: 'after-tiles',
    paint: {}
  }, 'tunnel'); //'boundary_county'

  // before.addSource('before-tiles', {
  //   type: 'raster',
  //   tiles: [
  //     'https://gis.buncombecounty.org/arcgis/rest/services/Images_2024_PIC/ImageServer/tile/{z}/{y}/{x}'
  //   ],
  //   tileSize: 256,
  //   attribution: "<a href='https://gis.buncombecounty.org'>Buncombe County Gov</a>"
  // });
  //
  // before.addLayer({
  //   id: 'before-layer',
  //   type: 'raster',
  //   source: 'before-tiles',
  //   paint: {}
  // }, 'tunnel'); //'boundary_county'
});

// Use either of these patterns to select a container for the compare widget
var wrapperSelector = "#wrapper";
var wrapperElement = document.body.querySelectorAll("#wrapper")[0];

// available options
var options = {
  mousemove: true,
  orientation: "horizontal",
};

window.compare = new maplibregl.Compare(
  before,
  after,
  wrapperSelector
  // options
);
