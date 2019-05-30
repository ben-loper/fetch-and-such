async function getData() {
  const resp = await fetch('data/ZonAnn.Ts+dSST.csv');
  return await resp.text();
}

getData().then(table => {
  const rows = table.split('\n');

  //remove the first row
  rows.shift();

  const labels = [];
  const globalTemps = [];
  const nHemiTemps = [];
  const sHemiTemps = [];

  const globalAvgTempInCelc = 14.25;
  const nHemiAvgTempInCelc = 15.2;
  const sHemiAvgTempInCelc = 13.3;

  rows.forEach(row => {
    const columns = row.split(',');

    labels.push(columns[0]);

    const diffFromGlobalMean = columns[1];
    const diffFromNorthHemiMean = columns[2];
    const diffFromSouthHemiMean = columns[3];

    const avgGlobalTempInCelc =
      parseFloat(diffFromGlobalMean) + globalAvgTempInCelc;
    const avgGlobalTempInFahr =
      Math.round(convertFromCelcToFahr(avgGlobalTempInCelc) * 100) / 100;
    //globalTemps.push(avgGlobalTempInCelc);
    globalTemps.push(avgGlobalTempInFahr);

    const avgNorthHemiTempInCelc =
      parseFloat(diffFromNorthHemiMean) + nHemiAvgTempInCelc;
    const avgNorthHemiTempInFahr =
      Math.round(convertFromCelcToFahr(avgNorthHemiTempInCelc) * 100) / 100;
    //nHemiTemps.push(avgNorthHemiTempInCelc);
    nHemiTemps.push(avgNorthHemiTempInFahr);

    const avgSouthHemiTempInCelc =
      parseFloat(diffFromSouthHemiMean) + sHemiAvgTempInCelc;
    const avgSouthHemiTempInFahr =
      Math.round(convertFromCelcToFahr(avgSouthHemiTempInCelc) * 100) / 100;
    //sHemiTemps.push(avgSouthHemiTempInCelc);
    sHemiTemps.push(avgSouthHemiTempInFahr);
  });

  generateChart(labels, globalTemps, nHemiTemps, sHemiTemps);
});

function generateChart(years, globalTemps, nHemiTemps, sHemiTemps) {
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: years,
      datasets: [
        {
          label: 'Average Global Temperature in F°',
          data: globalTemps,
          fill: false,
          borderColor: '#FF7F7F',
          borderWidth: 2,
          pointBorderWidth: 1
        },
        {
          label: 'Average Northern Hemisphere Temperature in F°',
          data: nHemiTemps,
          fill: false,
          borderColor: '#73C2FB',
          borderWidth: 2,
          pointBorderWidth: 1
        },
        {
          label: 'Average Southern Hemisphere Temperature in F°',
          data: sHemiTemps,
          fill: false,
          borderColor: '#99ff99',
          borderWidth: 2,
          pointBorderWidth: 1
        }
      ]
    },

    // Configuration options go here
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              // Include a degree symbol in the ticks
              callback: function(value) {
                return value + '°';
              }
            }
          }
        ]
      }
    }
  });
}

function convertFromCelcToFahr(temp) {
  return (temp * 9) / 5 + 32;
}
