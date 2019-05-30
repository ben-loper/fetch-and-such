async function getData() {
  const resp = await fetch('data/ZonAnn.Ts+dSST.csv');
  return await resp.text();
}

getData().then(table => {
  const rows = table.split('\n');

  //remove the first row
  rows.shift();

  const labels = [];
  const data = [];

  rows.forEach(row => {
    const columns = row.split(',');

    labels.push(columns[0]);

    const diffFromGlobalMean = columns[1];

    const avgTempInCelc = parseFloat(diffFromGlobalMean) + 14;

    const avgTempInFahr =
      Math.round(convertFromCelcToFahr(avgTempInCelc) * 100) / 100;

    //data.push(avgTempInCelc);
    data.push(avgTempInFahr);
  });

  generateChart(labels, data);
});

function generateChart(years, temps) {
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: years,
      datasets: [
        {
          label:
            'Combined Land-Surface Air and Sea-Surface Water Temperature in F°',
          data: temps,
          fill: false,
          borderColor: '#FF7F7F',
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
