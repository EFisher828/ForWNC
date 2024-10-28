const source = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json';

// Initialise the map
const map = new maplibregl.Map({
  container: 'map',
  style: '../js/roads-basemap-with-terrain.json',
  center: [-82.3923,35.6022],
  zoom: 11
  // maxBounds: [-82.41357860258921, 35.59428129648903, -82.37105317540306, 35.60931855025633]
});

const media = {
  0: {
    'type': 'tweet',
    'url': 'https://twitter.com/EFisherWX/status/1850604305855725922',
    'latitude': 35.6608,
    'longitude': -82.5056
  },
  1: {
    'type': 'tweet',
    'url': 'https://twitter.com/EFisherWX/status/1843449872080613781',
    'latitude': 35.4502,
    'longitude': -82.2834
  },
  2: {
    'type': 'tweet',
    'url': 'https://twitter.com/HenryWX/status/1848095199332893174',
    'latitude': 36.0506,
    'longitude': -81.8443
  },
  3: {
    'type': 'tweet',
    'url': 'https://twitter.com/_TheLast_Stand_/status/1844581410109018307',
    'latitude': 35.6663,
    'longitude': -82.4957
  },
  4: {
    'type': 'tweet',
    'url': 'https://twitter.com/EFisherWX/status/1843451755667042508',
    'latitude': 35.4414,
    'longitude': -82.2571
  },
  5: {
    'type': 'tweet',
    'url': 'https://twitter.com/EFisherWX/status/1843453660472414638',
    'latitude': 35.4457,
    'longitude': -82.2717
  },
  6: {
    'type': 'tweet',
    'url': 'https://twitter.com/EFisherWX/status/1842682801738444987',
    'latitude': 35.5968,
    'longitude': -82.3163
  },
  7: {
    'type': 'tweet',
    'url': 'https://twitter.com/EFisherWX/status/1842319416458953141',
    'latitude': 35.5156,
    'longitude': -82.4082
  },
  8: {
    'type': 'tweet',
    'url': 'https://twitter.com/EFisherWX/status/1842270823329280141',
    'latitude': 35.4716,
    'longitude': -82.4267
  },
  9: {
    'type': 'tweet',
    'url': 'https://twitter.com/jackendrickwx/status/1841671035176816873',
    'latitude': 35.5540,
    'longitude': -82.3244
  },
  10: {
    'type': 'tweet',
    'url': 'https://twitter.com/EFisherWX/status/1841125444617150513',
    'latitude': 35.6081,
    'longitude': -82.3405
  },
  11: {
    'type': 'tweet',
    'url': 'https://twitter.com/EFisherWX/status/1840097708742484164',
    'latitude': 35.6021,
    'longitude': -82.4080
  },
  12: {
    'type': 'tweet',
    'url': 'https://twitter.com/skyoutbriout/status/1843283774794281335',
    'latitude': 35.8989,
    'longitude': -82.3165
  },
  13: {
    'type': 'tweet',
    'url': 'https://twitter.com/BlueRidgeNPS/status/1842609225970696683',
    'latitude': 35.83080,
    'longitude': -82.11562
  },
  14: {
    'type': 'tweet',
    'url': 'https://twitter.com/CMorganWX/status/1842148289228988547',
    'latitude': 35.5668,
    'longitude': -82.5455
  },
  15: {
    'type': 'tweet',
    'url': 'https://twitter.com/NCDOT/status/1841838976132432106',
    'latitude': 35.7572,
    'longitude': -83.0527
  },
  16: {
    'type': 'tweet',
    'url': 'https://twitter.com/NickStevensHSOT/status/1841838189398429927',
    'latitude': 35.5215,
    'longitude': -82.8428
  },
  17: {
    'type': 'tweet',
    'url': 'https://twitter.com/GardensR4Health/status/1841558598582993335',
    'latitude': 35.7970,
    'longitude': -82.6836
  },
  18: {
    'type': 'tweet',
    'url': 'https://twitter.com/CmPhillyEagles/status/1841639291790721067',
    'latitude': 35.5269,
    'longitude': -82.8412
  },
  19: {
    'type': 'tweet',
    'url': 'https://twitter.com/DE_LoganS/status/1841519500346200123',
    'latitude': 35.6274,
    'longitude': -82.1812
  },
  20: {
    'type': 'tweet',
    'url': 'https://twitter.com/corinne_perkins/status/1840820805732876502',
    'latitude': 35.4511,
    'longitude': -82.2872
  },
  21: {
    'type': 'tweet',
    'url': 'https://twitter.com/severeforecast/status/1840919150991999286',
    'latitude': 35.5692,
    'longitude': -82.5445
  },
  22: {
    'type': 'tweet',
    'url': 'https://twitter.com/amberlakeTV/status/1840781591825522926',
    'latitude': 35.8931,
    'longitude': -82.8267
  },
  24: {
    'type': 'tweet',
    'url': 'https://twitter.com/gbiffle/status/1840580533807411327',
    'latitude': 35.6004,
    'longitude': -82.3808
  },
  25: {
    'type': 'tweet',
    'url': 'https://twitter.com/PeeDee_WxSC/status/1840804834166849931',
    'latitude': 35.7959,
    'longitude': -82.6810
  },
  26: {
    'type': 'tweet',
    'url': 'https://twitter.com/KyleNoelWx/status/1840788602596319565',
    'latitude': 35.6149,
    'longitude': -82.5741
  },
  27: {
    'type': 'tweet',
    'url': 'https://twitter.com/dassterne/status/1840768941980811753',
    'latitude': 35.6162,
    'longitude': -82.5662
  },
  28: {
    'type': 'tweet',
    'url': 'https://twitter.com/brianstelter/status/1840744455176851609',
    'latitude': 35.6023,
    'longitude': -82.3979
  },
  29: {
    'type': 'tweet',
    'url': 'https://twitter.com/severeforecast/status/1840543834796655009',
    'latitude': 35.5684,
    'longitude': -82.5444
  },
  30: {
    'type': 'tweet',
    'url': 'https://twitter.com/FinTechInnov8r/status/1840450451998703951',
    'latitude': 35.4339,
    'longitude': -82.2179
  },
  31: {
    'type': 'tweet',
    'url': 'https://twitter.com/ChadRayVols/status/1840142242096222335',
    'latitude': 35.7604,
    'longitude': -83.0733
  },
  32: {
    'type': 'tweet',
    'url': 'https://twitter.com/KyleNoelWx/status/1840488498949681630',
    'latitude': 35.5939,
    'longitude': -82.5722
  },
  33: {
    'type': 'tweet',
    'url': 'https://twitter.com/AaronRigsbyOSC/status/1840422721663975689',
    'latitude': 35.4382,
    'longitude': -82.2463
  },
  34: {
    'type': 'tweet',
    'url': 'https://twitter.com/TomNiziol/status/1840417414313324972',
    'latitude': 36.1833,
    'longitude': -82.0756
  },
  35: {
    'type': 'tweet',
    'url': 'https://twitter.com/KyleNoelWx/status/1840400377675464893',
    'latitude': 35.6178,
    'longitude': -82.2621
  },
  36: {
    'type': 'tweet',
    'url': 'https://twitter.com/TeslaTruckClub/status/1840234855587631421',
    'latitude': 35.5310,
    'longitude': -82.8412
  },
  37: {
    'type': 'tweet',
    'url': 'https://twitter.com/weatherchannel/status/1839666307114906013',
    'latitude': 35.5698,
    'longitude': -82.5447
  },
  38: {
    'type': 'tweet',
    'url': 'https://twitter.com/BryceShelton01/status/1839663838037151801',
    'latitude': 35.3217,
    'longitude': -82.4248
  },
  39: {
    'type': 'tweet',
    'url': 'https://twitter.com/Tylertheweather/status/1839637005371601139',
    'latitude': 35.3071,
    'longitude': -82.4585
  },
  40: {
    'type': 'tweet',
    'url': 'https://twitter.com/NCDOT_Asheville/status/1839672315254059441',
    'latitude': 35.5647,
    'longitude': -82.4990
  },
  41: {
    'type': 'tweet',
    'url': 'https://twitter.com/AnnieMDance/status/1839754314736082948',
    'latitude': 35.4357,
    'longitude': -82.2347
  },
  42: {
    'type': 'tweet',
    'url': 'https://twitter.com/nikoliasgoninus/status/1839759876450595237',
    'latitude': 35.4399,
    'longitude': -82.2488
  },
  43: {
    'type': 'tweet',
    'url': 'https://twitter.com/nikoliasgoninus/status/1839762504584486959',
    'latitude': 35.4403,
    'longitude': -82.2498
  },
  44: {
    'type': 'tweet',
    'url': 'https://twitter.com/KyleNoelWx/status/1839838640580477238',
    'latitude': 36.1264,
    'longitude': -82.4442
  },
  45: {
    'type': 'tweet',
    'url': 'https://twitter.com/katcampbellwx/status/1840014277882597521',
    'latitude': 35.5689,
    'longitude': -82.5363
  },
  46: {
    'type': 'tweet',
    'url': 'https://twitter.com/babowling12/status/1840081868915609656',
    'latitude': 36.1251,
    'longitude': -82.4452
  },
  47: {
    'type': 'tweet',
    'url': 'https://twitter.com/piper_shuster/status/1840169124007424479',
    'latitude': 36.1251,
    'longitude': -82.4452
  },
  48: {
    'type': 'tweet',
    'url': 'https://twitter.com/piper_shuster/status/1840169124007424479',
    'latitude': 35.6157,
    'longitude': -82.5746
  },
  49: {
    'type': 'tweet',
    'url': 'https://twitter.com/jackendrickwx/status/1846343529339015568',
    'latitude': 35.5211,
    'longitude': -82.3051
  },
  50: {
    'type': 'tweet',
    'url': 'https://twitter.com/babowling12/status/1842312218517570039',
    'latitude': 35.6001,
    'longitude': -82.3741
  },
  51: {
    'type': 'tweet',
    'url': 'https://twitter.com/DE_LoganS/status/1842110118323798518',
    'latitude': 35.2193,
    'longitude': -82.3319
  },
  52: {
    'type': 'tweet',
    'url': 'https://twitter.com/jackendrickwx/status/1841510721760497977',
    'latitude': 35.7357,
    'longitude': -82.1286
  },
  53: {
    'type': 'tweet',
    'url': 'https://twitter.com/moaleck/status/1850653514512687127',
    'latitude': 35.5727,
    'longitude': -82.5253
  },
  54: {
    'type': 'tweet',
    'url': 'https://twitter.com/MHutton115/status/1841185099879997525',
    'latitude': 36.2777,
    'longitude': -81.5699
  },
  55: {
    'type': 'tweet',
    'url': 'https://twitter.com/JimmieS48898154/status/1840409895113314714',
    'latitude': 35.6028,
    'longitude': -82.3926
  },
  56: {
    'type': 'tweet',
    'url': 'https://twitter.com/jackendrickwx/status/1839695425239978384',
    'latitude': 34.8448,
    'longitude': -82.4009
  },
  57: {
    'type': 'tweet',
    'url': 'https://twitter.com/MarkHuneycutt4/status/1839639135465738560',
    'latitude': 35.5274,
    'longitude': -82.4952
  },
  58: {
    'type': 'tweet',
    'url': 'https://twitter.com/eastwx/status/1839658064401600661',
    'latitude': 36.2186,
    'longitude': -81.6838
  },
  59: {
    'type': 'tweet',
    'url': 'https://twitter.com/smokiesvol/status/1840077470931832933',
    'latitude': 36.2642,
    'longitude': -81.7922
  },
  60: {
    'type': 'tweet',
    'url': 'https://twitter.com/severeforecast/status/1840132139049742361',
    'latitude': 35.2913,
    'longitude': -82.7693
  },
  61: {
    'type': 'tweet',
    'url': 'https://twitter.com/Hvward/status/1840845304020480264',
    'latitude': 35.5816,
    'longitude': -82.4932
  },
  62: {
    'type': 'tweet',
    'url': 'https://twitter.com/EthanClarkWX/status/1840930329629978696',
    'latitude': 36.5482,
    'longitude': -81.4687
  },
  63: {
    'type': 'tweet',
    'url': 'https://twitter.com/EthanClarkWX/status/1840930329629978696',
    'latitude': 35.6019,
    'longitude': -82.4062
  },
  64: {
    'type': 'tweet',
    'url': 'https://twitter.com/jackendrickwx/status/1841183044440637768',
    'latitude': 35.2644,
    'longitude': -82.3211
  },
  65: {
    'type': 'tweet',
    'url': 'https://twitter.com/EthanClarkWX/status/1841658278452887666',
    'latitude': 36.0157,
    'longitude': -82.3513
  },
  66: {
    'type': 'tweet',
    'url': 'https://twitter.com/babowling12/status/1841257851802546626',
    'latitude': 35.9157,
    'longitude': -82.0692
  },
  67: {
    'type': 'tweet',
    'url': 'https://twitter.com/LeanneSpurs/status/1846972183853289651',
    'latitude': 35.9054,
    'longitude': -82.2162
  },
  68: {
    'type': 'tweet',
    'url': 'https://twitter.com/GardensR4Health/status/1846526892372869479',
    'latitude': 35.9076,
    'longitude': -82.2158
  },
  69: {
    'type': 'tweet',
    'url': 'https://twitter.com/mikealsip/status/1841687120315891825',
    'latitude': 35.9076,
    'longitude': -82.2158
  },
  70: {
    'type': 'tweet',
    'url': 'https://twitter.com/JudgeBobOrr/status/1840135731039101265',
    'latitude': 35.8850,
    'longitude': -82.2846
  }
}

let lastClickedMarker = null;

// Function to load tweets as markers on the MapLibre map
const loadTweetMarkers = (map, media) => {
    Object.keys(media).forEach((key) => {
        const tweetData = media[key];

        // Create a MapLibre marker at the given latitude and longitude
        const marker = new maplibregl.Marker()
            .setLngLat([tweetData.longitude, tweetData.latitude])
            .addTo(map);

        // Load Twitter widgets script when the marker is clicked
        marker.getElement().addEventListener('click', () => {
          console.log(key)

          const tweetContainer = document.getElementById('tweet-container');
          tweetContainer.innerHTML = '';

          // Create the blockquote element for the tweet
          const blockquote = document.createElement('blockquote');
          blockquote.className = 'twitter-tweet';

          // Create the anchor element for the tweet URL
          const anchor = document.createElement('a');
          anchor.href = tweetData.url;

          // Append the anchor to the blockquote
          blockquote.appendChild(anchor);

          // Append the blockquote to the tweet container
          tweetContainer.appendChild(blockquote);

          const script = document.createElement('script');
          script.setAttribute('async', 'true');
          script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
          script.setAttribute('charset', 'utf-8');
          document.head.appendChild(script);
        });
    });
};

map.on('load', () => {
  loadTweetMarkers(map, media)
})

const tweetContainer = document.getElementById('tweet-container');
tweetContainer.innerHTML = '';

// Create the blockquote element for the tweet
const blockquote = document.createElement('blockquote');
blockquote.className = 'twitter-tweet';

// Create the anchor element for the tweet URL
const anchor = document.createElement('a');
anchor.href = media[0].url;

// Append the anchor to the blockquote
blockquote.appendChild(anchor);

// Append the blockquote to the tweet container
tweetContainer.appendChild(blockquote);

const script = document.createElement('script');
script.setAttribute('async', 'true');
script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
script.setAttribute('charset', 'utf-8');
document.head.appendChild(script);
