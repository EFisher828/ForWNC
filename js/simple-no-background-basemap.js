{
  "version": 8,
  "id": "hybrid",
  "name": "Imagery Hybrid",
  "sources": {
    "openmaptiles": {
      "tiles": [
        "https://mapscdn.ngs.noaa.gov/vector/osm-2022-05-02-north-america/{z}/{x}/{y}.pbf"
      ],
      "type": "vector",
      "minzoom": 0,
      "maxzoom": 18
    }
  },
  "layers": [
    {
      "id": "tunnel",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "layout": {
        "line-cap": "butt",
        "line-join": "miter"
      },
      "paint": {
        "line-color": "rgba(255, 255, 255, 0.2)",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.5
          ],
          [
            "zoom"
          ],
          6,
          0.5,
          20,
          30
        ],
        "line-dasharray": [
          0.28,
          0.14
        ]
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "brunnel",
          "tunnel"
        ],
        [
          "in",
          "class",
          "motorway",
          "primary",
          "secondary",
          "tertiary",
          "trunk"
        ]
      ]
    },
    {
      "id": "path",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "layout": {
        "line-cap": "square",
        "line-join": "bevel"
      },
      "paint": {
        "line-color": "rgba(247, 247, 247, 0.33)",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.5
          ],
          [
            "zoom"
          ],
          14,
          0.5,
          20,
          4
        ],
        "line-dasharray": [
          1,
          1
        ]
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "path",
          "track"
        ]
      ]
    },
    {
      "id": "road",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "layout": {
        "line-cap": "butt",
        "line-join": "round"
      },
      "paint": {
        "line-color": {
          "stops": [
            [
              8,
              "rgba(255, 255, 255, 0.2)"
            ],
            [
              14,
              "rgba(255, 255, 255, 0.4)"
            ],
            [
              18,
              "rgba(255, 255, 255, 0.5)"
            ]
          ]
        },
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          5,
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "motorway",
              "motorway_link"
            ],
            1,
            0
          ],
          7,
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "motorway",
              "motorway_link"
            ],
            1.4,
            0
          ],
          8,
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "motorway",
              "motorway_link",
              "primary",
              "trunk"
            ],
            0.75,
            0
          ],
          9,
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "secondary",
              "tertiary"
            ],
            0.7,
            1
          ],
          10,
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "motorway",
              "motorway_link"
            ],
            1.3,
            1.3
          ],
          14,
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "minor",
              "service"
            ],
            0.5,
            2.4
          ]
        ]
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "!in",
          "class",
          "rail",
          "ferry",
          "path",
          "track"
        ],
        [
          "!=",
          "brunnel",
          "tunnel"
        ]
      ]
    },
    {
      "id": "railway",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 11,
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(179, 170, 158, 0.2)",
        "line-opacity": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          11,
          0.5,
          16,
          1.3
        ]
      },
      "filter": [
        "==",
        "class",
        "rail"
      ]
    },
    {
      "id": "admin_sub",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "boundary",
      "minzoom": 3,
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(194, 194, 194, 0.5)",
        "line-dasharray": [
          2,
          1
        ]
      },
      "filter": [
        "in",
        "admin_level",
        4,
        6,
        8
      ]
    },
    {
      "id": "admin_country-dark",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "boundary",
      "layout": {
        "line-cap": "butt",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(0, 0, 0, 0.51)",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.5
          ],
          [
            "zoom"
          ],
          3,
          0.5,
          21,
          32
        ],
        "line-offset": 1
      },
      "filter": [
        "all",
        [
          "<=",
          "admin_level",
          2
        ],
        [
          "==",
          "$type",
          "LineString"
        ]
      ]
    },
    {
      "id": "admin_country",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "boundary",
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(226, 226, 226, 1)",
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.5
          ],
          [
            "zoom"
          ],
          3,
          0.5,
          21,
          32
        ]
      },
      "filter": [
        "all",
        [
          "<=",
          "admin_level",
          2
        ],
        [
          "==",
          "$type",
          "LineString"
        ]
      ]
    },
    {
      "id": "road_label",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "transportation_name",
      "layout": {
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-size": [
          "interpolate",
          [
            "linear",
            0.75,
            1,
            0.75,
            1
          ],
          [
            "zoom"
          ],
          10,
          8,
          15,
          9
        ],
        "text-field": "{name:latin} {name:nonlatin}",
        "text-transform": "none",
        "symbol-placement": "line",
        "text-letter-spacing": 0.1,
        "text-rotation-alignment": "map"
      },
      "paint": {
        "text-color": "rgba(255, 255, 255, 1)",
        "text-halo-color": "rgba(43, 43, 43, 1)",
        "text-halo-width": 1
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "!=",
          "subclass",
          "ferry"
        ]
      ]
    },
    {
      "id": "place_label",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 3,
      "maxzoom": 16,
      "layout": {
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-size": [
          "interpolate",
          [
            "linear",
            0.5,
            1,
            0.5,
            1
          ],
          [
            "zoom"
          ],
          3,
          [
            "match",
            [
              "get",
              "class"
            ],
            "city",
            11,
            10
          ],
          6,
          [
            "match",
            [
              "get",
              "class"
            ],
            "city",
            14.5,
            11
          ],
          8,
          [
            "match",
            [
              "get",
              "class"
            ],
            "city",
            16,
            12
          ],
          10,
          [
            "match",
            [
              "get",
              "class"
            ],
            "city",
            20,
            13
          ]
        ],
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-max-width": 10
      },
      "paint": {
        "text-color": "rgba(255, 255, 255, 1)",
        "text-halo-blur": 0.5,
        "text-halo-color": "rgba(0, 0, 0, 1)",
        "text-halo-width": 1
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "!in",
          "class",
          "country",
          "state"
        ]
      ]
    },
    {
      "id": "state_label",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 3,
      "maxzoom": 12,
      "layout": {
        "text-font": [
          "Noto Sans Italic"
        ],
        "text-size": [
          "interpolate",
          [
            "linear",
            0.75,
            1,
            0.75,
            1
          ],
          [
            "zoom"
          ],
          1,
          [
            "step",
            [
              "get",
              "rank"
            ],
            13,
            1,
            12,
            2,
            12
          ],
          4,
          [
            "step",
            [
              "get",
              "rank"
            ],
            15,
            1,
            13,
            2,
            13
          ],
          6,
          [
            "step",
            [
              "get",
              "rank"
            ],
            23,
            1,
            17,
            2,
            17
          ],
          9,
          [
            "step",
            [
              "get",
              "rank"
            ],
            27,
            1,
            20,
            2,
            20
          ]
        ],
        "text-field": "{name:latin}",
        "text-max-width": 10
      },
      "paint": {
        "text-color": "rgba(255, 255, 255, 1)",
        "text-halo-blur": 1,
        "text-halo-color": "rgba(0, 0, 0, 1)",
        "text-halo-width": 1
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "in",
          "class",
          "state"
        ],
        [
          "<",
          "rank",
          3
        ]
      ]
    },
    {
      "id": "country_label",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 12,
      "layout": {
        "text-font": [
          "Noto Sans Bold"
        ],
        "text-size": [
          "interpolate",
          [
            "linear",
            0.75,
            1,
            0.75,
            1
          ],
          [
            "zoom"
          ],
          1,
          [
            "step",
            [
              "get",
              "rank"
            ],
            13,
            1,
            12,
            2,
            12
          ],
          4,
          [
            "step",
            [
              "get",
              "rank"
            ],
            15,
            1,
            14,
            2,
            14
          ],
          6,
          [
            "step",
            [
              "get",
              "rank"
            ],
            23,
            1,
            18,
            2,
            18
          ],
          9,
          [
            "step",
            [
              "get",
              "rank"
            ],
            27,
            1,
            22,
            2,
            22
          ]
        ],
        "text-field": "{name:latin}",
        "text-max-width": 10
      },
      "paint": {
        "text-color": "rgba(255, 255, 255, 1)",
        "text-halo-blur": 1,
        "text-halo-color": "rgba(0, 0, 0, 1)",
        "text-halo-width": 1
      },
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "in",
          "class",
          "country"
        ]
      ]
    }
  ],
  "metadata": {
    "maptiler:copyright": "This style was generated on MapTiler Cloud. Usage outside of MapTiler Cloud requires valid MapTiler Data Package: https://www.maptiler.com/data/package/ -- please contact us."
  },
  "glyphs": "https://mapscdn.ngs.noaa.gov/fonts/{fontstack}/{range}.pbf",
  "bearing": 0,
  "pitch": 0,
  "center": [
    0,
    0
  ],
  "zoom": 0
}
