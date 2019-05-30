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
    data.push(columns[1]);
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
          label: 'Change in Global Surface Temperature',
          data: temps,
          fill: false,
          borderColor: '#922893',
          borderWidth: 2,
          pointBorderWidth: 1
        }
      ]
    },

    // Configuration options go here
    options: {}
  });
}
