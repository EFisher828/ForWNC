// Initialise the map
const map = new maplibregl.Map({
  container: 'map',
  style: '../js/roads-basemap-with-terrain-3d-dark.json',
  center: [-82.2315, 35.7583],
  zoom: 8.17
});



const geojsonFilePath = '../data/brp-sections-custom.geojson';

const getColorForClosure = (status) => {
  switch (status) {
    case 'Open':
      return '#1779d4';
    case 'Closed':
      return '#c20606';
    case 'Variable Closures':
      return '#eb7b0c';
    case 'Ungated':
      return '#49c7f2';
    default:
      return 'gray';
  }
}

const buildMap = (allClosures) => {
  console.log(allClosures)
  // Load GeoJSON from a local file
  fetch(geojsonFilePath)
    .then(response => response.json())
    .then(geojsonData => {
      // Add the GeoJSON data to the map
      map.on('load', () => {
        map.addControl(new maplibregl.NavigationControl(), 'top-right');

        // Select all elements with the class 'maplibregl-ctrl-top-right'
        let elements = document.querySelectorAll('.maplibregl-ctrl-top-right');

        // Iterate over the selected elements and change their CSS
        elements.forEach(element => {
          element.style.right = '1.2vh'
          element.style.top = '7vh'
          element.boxShadow = '0 0 1vh black'
        });

        map.addSource('geojson-data', {
          type: 'geojson',
          data: geojsonData,
        });

        // Add a layer for the GeoJSON data
        map.addLayer({
          id: 'geojson-layer',
          type: 'line',
          source: 'geojson-data',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-width': 10,
            'line-opacity': 1,
            'line-color': [
              'match',
              ['get', 'name'],
              ...allClosures.flatMap(closure => [closure[0], getColorForClosure(closure[1])]),
              'gray', // Default color if no match
            ],
          },
        },"watername_ocean");

        // Add click event listener to show popups
        map.on('click', 'geojson-layer', (e) => {
          const name = e.features[0].properties.name;

          // Find the corresponding array in informationArray
          const correspondingArray = allClosures.find(item => item[0] === name);

          if (correspondingArray) {
            new maplibregl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(`
                <p class="brp-header">Status: ${correspondingArray[1]}</p>
                <p style="text-align:center;">${correspondingArray[2]}</p>
                <p style="text-align:center;">${correspondingArray[3]}</p>
              `)//
              .addTo(map);
          } else {
            // Handle the case when no corresponding array is found
            console.log(`No information found for ${name}`);
          }
        });

        // Change the cursor to a pointer when the mouse is over the geojson layer
        map.on('mouseenter', 'geojson-layer', () => {
          map.getCanvas().style.cursor = 'pointer';
        });

        // Change the cursor back to the default when it leaves the geojson layer
        map.on('mouseleave', 'geojson-layer', () => {
          map.getCanvas().style.cursor = '';
        });
      });
    })
    .catch(error => console.error('Error loading GeoJSON:', error));
}

const processTable = (table) => {
  // Check if the word 'Open' appears in the content of the third column for each row
  table.querySelectorAll('tr').forEach(row => {
    let rowData = []
    let mileposts = row.querySelector('td:nth-child(1)').textContent.trim();
    const crossroads = row.querySelector('td:nth-child(2)').textContent.trim();
    const closureStatus = row.querySelector('td:nth-child(3)').textContent.trim();

    //const notes = row.querySelector('td:nth-child(4)').textContent.trim();
    console.log(mileposts)
    if (mileposts != 'Parkway\nMileposts by Section') {
      mileposts = mileposts.replace(/\s/g, '')
      mileposts = mileposts.replace('-', ' to ') + " Parkway";
      if (closureStatus.includes('Open') && closureStatus.includes('closed')) {
        rowData.push(mileposts, 'Variable Closures', crossroads)
      } else if (closureStatus.includes('Open')) {
        console.log('The word "Open" appears in the third column:', closureStatus);
        rowData.push(mileposts , 'Open', crossroads)
      } else if (closureStatus.includes('Variable') && closureStatus.includes('closures')) {
        console.log('The word "Variable Closures" does appear in the third column:', closureStatus);
        rowData.push(mileposts, 'Variable Closures', crossroads)
      } else if (closureStatus.includes('Closed') || closureStatus.includes('closures') || closureStatus.includes('closed')) {
        console.log('The word "Closed" does appear in the third column:', closureStatus);
        rowData.push(mileposts, 'Closed', crossroads)
      } else if (closureStatus.includes('Closure') || closureStatus.includes('closure')) {
        console.log('The word "Closure" does appear in the third column:', closureStatus);
        rowData.push(mileposts, 'Closed', crossroads)
      } else if (closureStatus.includes('Ungated')) {
        console.log('The word "Ungated" does appear in the third column:', closureStatus);
        rowData.push(mileposts, 'Ungated', crossroads)
      } else {
        console.log('Unknown word in the third column:', closureStatus);
        rowData.push(mileposts, 'Unknown', crossroads)
      }

      try {
        if (closureStatus.includes('Ungated')) {
          rowData.push('Sections of the roadway marked as "ungated" are open except in emergency situations.')
        } else {
          rowData.push(row.querySelector('td:nth-child(4)').textContent.trim())
        }
      } catch {
        rowData.push(' ')
      }
      /*if (row.querySelector('td:nth-child(4)').textContent.trim()) {

      }*/

      allClosures.push(rowData)
    }
  });

  // buildMap(allClosures)
}

const allClosures = []

const url = 'https://www.nps.gov/blri/planyourvisit/roadclosures.htm';

// Fetch the HTML content of the page
fetch(url)
  .then(response => response.text())
  .then(html => {
    // Parse the HTML using DOMParser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    for (let i = 0; i < 2; i++) {
      // Select the second table on the page
      const secondTable = doc.querySelectorAll('table')[i+1];

      processTable(secondTable)
    }

    buildMap(allClosures)

  })
  .catch(error => console.error('Error:', error));
