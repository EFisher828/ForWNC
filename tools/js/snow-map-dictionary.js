let datasets;

fetch('https://monarchweatherenterprise.com/mv3/general/dictionary.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Handle the JSON data here
    datasets = data
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });



const variables = {
  'asnow': {
    'cmap': ['#000000','#CBEDF5','#AEDFF0','#9CCDEE','#85B5EF','#719DD2','#5A83C9','#5562B4','#A482E5','#CC9EEC','#E5BEEC','#EF9FB9','#EF88A6','#DA7298','#A87C97','#908797','#6C7C97','#6299B1','#6299B1'],
    // 'cmap': ['#000000','#7de9ff','#48daff','#19bbff','#1987ff','#1967ff','#0047c2','#8a3ee5','#cd4de5','#ff84f9','#ffbeff','#ffb9b4','#ff8f6b','#ff596b','#DA7298','#a87c97','#6c7c97','#6299B1','#6299B1'],
    'bins': [-10,0.1,0.5,1,2,3,4,5,6,8,12,18,24,30,36,42,48,60,100000],
    'cmapType': 'continuous',
    'topLabel': '60"+',
    'bottomLabel': 'T - 0.5',
    'units': `"`,
    'label': 'Total Snowfall',
    'title': 'Total Snowfall (in.)',
    'itrthreshold': 1000,
    'fixed': 1
  }
}
