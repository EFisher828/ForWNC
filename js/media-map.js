const source = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json';

// Initialise the map
const map = new maplibregl.Map({
  container: 'map',
  style: '../js/roads-basemap-with-terrain.json',
  center: [-82.2315, 35.7583],
  zoom: 8.17
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
  // 65: {
  //   'type': 'tweet',
  //   'url': 'https://twitter.com/EthanClarkWX/status/1841658278452887666',
  //   'latitude': 36.0157,
  //   'longitude': -82.3513
  // },
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
  },
  71: {
    'type': 'tweet',
    'url': 'https://twitter.com/AmericanaMama_/status/1841670960375627800',
    'latitude': 35.8796,
    'longitude': -82.2229
  },
  72: {
    'type': 'tweet',
    'url': 'https://twitter.com/Lucyblululu/status/1844523857425608856',
    'latitude': 35.9159,
    'longitude': -82.2473
  },
  73: {
    'type': 'tweet',
    'url': 'https://twitter.com/AmericanaMama_/status/1841670036223668601',
    'latitude': 35.9074,
    'longitude': -82.2157
  },
  74: {
    'type': 'tweet',
    'url': 'https://twitter.com/mikealsip/status/1841687120315891825',
    'latitude': 35.8635,
    'longitude': -82.2012
  },
  75: {
    'type': 'tweet',
    'url': 'https://twitter.com/Justin__Berger/status/1841287831085285486',
    'latitude': 35.9091,
    'longitude': -82.2135
  },
  76: {
    'type': 'tweet',
    'url': 'https://twitter.com/iveybyrd/status/1839785290916941952',
    'latitude': 35.9059,
    'longitude': -82.1878
  },
  77: {
    'type': 'tweet',
    'url': 'https://twitter.com/LeanneSpurs/status/1850223843891138943',
    'latitude': 35.9167,
    'longitude': -82.0714
  },
  78: {
    'type': 'tweet',
    'url': 'https://twitter.com/LeanneSpurs/status/1850149775716352079',
    'latitude': 35.9134,
    'longitude': -82.0669
  },
  79: {
    'type': 'tweet',
    'url': 'https://twitter.com/LeanneSpurs/status/1850122190475190599',
    'latitude': 35.9144,
    'longitude': -82.0671
  },
  80: {
    'type': 'tweet',
    'url': 'https://twitter.com/RGVTRUTH1/status/1850907802702631414',
    'latitude': 35.8907,
    'longitude': -82.2823
  },
  81: {
    'type': 'tweet',
    'url': 'https://twitter.com/RGVTRUTH1/status/1842185298010382679',
    'latitude': 35.8458,
    'longitude': -82.3050
  },
  82: {
    'type': 'tweet',
    'url': 'https://twitter.com/ryantyre/status/1848941099114492159',
    'latitude': 35.8477,
    'longitude': -82.3075
  },
  83: {
    'type': 'tweet',
    'url': 'https://twitter.com/ryantyre/status/1848954390914179520',
    'latitude': 35.8842,
    'longitude': -82.2850
  },
  84: {
    'type': 'tweet',
    'url': 'https://twitter.com/scannerfood/status/1840831157170008069',
    'latitude': 35.9159,
    'longitude': -82.0698
  },
  85: {
    'type': 'tweet',
    'url': 'https://twitter.com/katwrappah/status/1840013159098089746',
    'latitude': 35.9156,
    'longitude': -82.0758
  },
  86: {
    'type': 'tweet',
    'url': 'https://twitter.com/T00ManyCommies/status/1840053094224167198',
    'latitude': 35.8331,
    'longitude': -82.0896
  },
  87: {
    'type': 'tweet',
    'url': 'https://twitter.com/katwrappah/status/1840012352822849632',
    'latitude': 35.8496,
    'longitude': -82.0649
  },
  88: {
    'type': 'tweet',
    'url': 'https://twitter.com/PFKHealth/status/1840805345930985695',
    'latitude': 35.5419,
    'longitude': -82.3808
  },
  89: {
    'type': 'tweet',
    'url': 'https://twitter.com/AaronRigsbyOSC/status/1840800944411288033',
    'latitude': 35.6254,
    'longitude': -82.1774
  },
  90: {
    'type': 'tweet',
    'url': 'https://twitter.com/NelsonAerials/status/1840394071572934702',
    'latitude': 35.6256,
    'longitude': -82.1804
  },
  91: {
    'type': 'tweet',
    'url': 'https://twitter.com/rail_dawg/status/1840584972886815050',
    'latitude': 35.62934,
    'longitude': -82.1874
  },
  92: {
    'type': 'tweet',
    'url': 'https://twitter.com/T00ManyCommies/status/1840551006733525160',
    'latitude': 35.6271,
    'longitude': -82.1812
  },
  93: {
    'type': 'tweet',
    'url': 'https://twitter.com/RiskyChrisky/status/1842308691460255812',
    'latitude': 35.5581,
    'longitude': -82.3174
  },
  94: {
    'type': 'tweet',
    'url': 'https://twitter.com/GardensR4Health/status/1842010043996127255',
    'latitude': 35.5533,
    'longitude': -82.3259
  },
  95: {
    'type': 'tweet',
    'url': 'https://twitter.com/Majac00/status/1843016748590919937',
    'latitude': 35.5786,
    'longitude': -82.5190
  },
  96: {
    'type': 'tweet',
    'url': 'https://twitter.com/severeforecast/status/1840557762616455394',
    'latitude': 35.3185,
    'longitude': -80.9896
  },
  97: {
    'type': 'tweet',
    'url': 'https://twitter.com/severeforecast/status/1839775061567516899',
    'latitude': 35.3349,
    'longitude': -82.6520
  },
  98: {
    'type': 'tweet',
    'url': 'https://twitter.com/MakingtheDoh/status/1843376776963387421',
    'latitude': 35.7379,
    'longitude': -82.1349
  },
  99: {
    'type': 'tweet',
    'url': 'https://twitter.com/TaylorThompTV/status/1839774930600071448',
    'latitude': 35.7839,
    'longitude': -82.4883
  },
  100: {
    'type': 'tweet',
    'url': 'https://twitter.com/BANANAPHONE0017/status/1849965735935693084',
    'latitude': 35.7655,
    'longitude': -82.4335
  },
  101: {
    'type': 'tweet',
    'url': 'https://twitter.com/brandon_macer/status/1843625023262818431',
    'latitude': 35.7649,
    'longitude': -82.4332
  },
  102: {
    'type': 'tweet',
    'url': 'https://twitter.com/cicispizzaaa/status/1841686201767432440',
    'latitude': 35.7781,
    'longitude': -82.4593
  },
  103: {
    'type': 'tweet',
    'url': 'https://twitter.com/nailbender1974/status/1848679332824133680',
    'latitude': 36.0352,
    'longitude': -82.2965
  },
  104: {
    'type': 'tweet',
    'url': 'https://twitter.com/FunkerActual/status/1845823575443267847',
    'latitude': 36.0365,
    'longitude': -82.2958
  },
  105: {
    'type': 'tweet',
    'url': 'https://twitter.com/RonnieAdkins_/status/1844443297831583780',
    'latitude': 36.0359,
    'longitude': -82.2951
  },
  106: {
    'type': 'tweet',
    'url': 'https://twitter.com/LeanneSpurs/status/1850104704484659443',
    'latitude': 36.01567,
    'longitude': -82.3513
  },
  107: {
    'type': 'tweet',
    'url': 'https://twitter.com/LeanneSpurs/status/1850101717448212917',
    'latitude': 36.0003,
    'longitude': -82.3584
  },
  108: {
    'type': 'tweet',
    'url': 'https://twitter.com/LeanneSpurs/status/1850071742493999168',
    'latitude': 36.0094,
    'longitude': -82.3475
  },
  109: {
    'type': 'tweet',
    'url': 'https://twitter.com/LeanneSpurs/status/1850064943942344870',
    'latitude': 35.9947,
    'longitude': -82.3733
  },
  110: {
    'type': 'tweet',
    'url': 'https://twitter.com/Creeker1775/status/1843107195162096085',
    'latitude': 36.0006,
    'longitude': -82.3576
  },
  111: {
    'type': 'tweet',
    'url': 'https://twitter.com/1Nicdar/status/1846131789418344940',
    'latitude': 36.0821,
    'longitude': -82.3500
  },
  112: {
    'type': 'tweet',
    'url': 'https://twitter.com/its_The_Dr/status/1844370066831204804',
    'latitude': 36.0688,
    'longitude': -82.3423
  },
  113: {
    'type': 'tweet',
    'url': 'https://twitter.com/EastTNHiking/status/1840570439279448462',
    'latitude': 36.0718,
    'longitude': -82.3987
  },
  114: {
    'type': 'tweet',
    'url': 'https://twitter.com/mikealsip/status/1841704175358431539',
    'latitude': 36.0050,
    'longitude': -82.2359
  },
  115: {
    'type': 'tweet',
    'url': 'https://twitter.com/EastTNHiking/status/1848722125793738989',
    'latitude': 36.0157,
    'longitude': -82.1979
  },
  116: {
    'type': 'tweet',
    'url': 'https://twitter.com/ford_engine/status/1845285062062797154',
    'latitude': 36.0120,
    'longitude': -82.1508
  },
  117: {
    'type': 'tweet',
    'url': 'https://twitter.com/matt_vanswol/status/1846653449716543765',
    'latitude': 35.6235,
    'longitude': -82.5808
  },
  118: {
    'type': 'tweet',
    'url': 'https://twitter.com/matt_vanswol/status/1846287460793249795',
    'latitude': 35.6676,
    'longitude': -82.4775
  },
  119: {
    'type': 'tweet',
    'url': 'https://twitter.com/matt_vanswol/status/1845913514814140427',
    'latitude': 35.6641,
    'longitude': -82.4783
  },
  120: {
    'type': 'tweet',
    'url': 'https://twitter.com/matt_vanswol/status/1840771093583303005',
    'latitude': 35.6877,
    'longitude': -82.5529
  },
  121: {
    'type': 'tweet',
    'url': 'https://twitter.com/GEZUPA/status/1842777604249788436',
    'latitude': 35.5260,
    'longitude': -82.3051
  },
  122: {
    'type': 'tweet',
    'url': 'https://twitter.com/thinktankfranks/status/1850971802811461905',
    'latitude': 35.5581,
    'longitude': -82.3162
  },
  123: {
    'type': 'tweet',
    'url': 'https://twitter.com/thinktankfranks/status/1850733198839304304',
    'latitude': 35.5706,
    'longitude': -82.5371
  },
  124: {
    'type': 'tweet',
    'url': 'https://twitter.com/micahsherrill/status/1842646329996267606',
    'latitude': 35.4533,
    'longitude': -82.2903
  },
  125: {
    'type': 'tweet',
    'url': 'https://twitter.com/BrugalPapi/status/1840428939577077979',
    'latitude': 35.4688,
    'longitude': -82.3267
  },
  126: {
    'type': 'tweet',
    'url': 'https://twitter.com/voglerweather/status/1841113751811994100',
    'latitude': 35.3971,
    'longitude': -82.3162
  },
  127: {
    'type': 'tweet',
    'url': 'https://twitter.com/T00ManyCommies/status/1841867867718840598',
    'latitude': 35.8747,
    'longitude': -81.9432
  },
  128: {
    'type': 'tweet',
    'url': 'https://twitter.com/babowling12/status/1841652027199201595',
    'latitude': 36.6441,
    'longitude': -81.7422
  },
  129: {
    'type': 'tweet',
    'url': 'https://twitter.com/Appalachistani/status/1840901916496445551',
    'latitude': 36.6351,
    'longitude': -81.7893
  },
  130: {
    'type': 'tweet',
    'url': 'https://twitter.com/MarcusHylton/status/1851256714093351248',
    'latitude': 35.5327,
    'longitude': -82.9075
  },
  131: {
    'type': 'tweet',
    'url': 'https://twitter.com/m3_melody/status/1843703969480356323',
    'latitude': 36.1583,
    'longitude': -82.5945
  },
  132: {
    'type': 'tweet',
    'url': 'https://twitter.com/voglerweather/status/1851269905703743938',
    'latitude': 35.3921,
    'longitude': -82.3738
  },
  133: {
    'type': 'tweet',
    'url': 'https://twitter.com/andrewprice0311/status/1851260897378849148',
    'latitude': 35.8564,
    'longitude': -82.1347
  },
  99999: {
    'type': 'tweet',
    'url': '',
    'latitude': -65.3971,
    'longitude': 100.3162
  }
}

let lastClickedMarker = null;

// Function to load tweets as markers on the MapLibre map
const loadTweetMarkers = (map, media) => {
  let previousMarker = null; // Variable to store the previously selected marker
  let marker = null;
  const defaultColor = '#32537E'; // Default color for markers
  const selectedColor = '#ff8800'; // Color for the selected marker

    Object.keys(media).forEach((key) => {
        const tweetData = media[key];

        if (key == 40) {
          // Create a MapLibre marker at the given latitude and longitude
          marker = new maplibregl.Marker({color: selectedColor})
              .setLngLat([tweetData.longitude, tweetData.latitude])
              .addTo(map);

          marker.getElement().style.zIndex = '1000'

          previousMarker = marker
        } else {
          // Create a MapLibre marker at the given latitude and longitude
          marker = new maplibregl.Marker({color: defaultColor})
              .setLngLat([tweetData.longitude, tweetData.latitude])
              .addTo(map);
        }

        // Load Twitter widgets script when the marker is clicked
        marker.getElement().addEventListener('click', () => {

          console.log(key)
          // Revert the color of the previous marker
            if (previousMarker) {
                previousMarker.remove();
                new maplibregl.Marker({ color: defaultColor })
                    .setLngLat(previousMarker.getLngLat())
                    .addTo(map);
            }

          marker.remove()

          const newMarker = new maplibregl.Marker({color: selectedColor})
              .setLngLat([tweetData.longitude, tweetData.latitude])
              .addTo(map);

          // Update the previousMarker variable
          previousMarker = newMarker;

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
anchor.href = media[40].url;

// Append the anchor to the blockquote
blockquote.appendChild(anchor);

// Append the blockquote to the tweet container
tweetContainer.appendChild(blockquote);

const script = document.createElement('script');
script.setAttribute('async', 'true');
script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
script.setAttribute('charset', 'utf-8');
document.head.appendChild(script);
