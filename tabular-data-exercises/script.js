async function getData() {
  const resp = await fetch('data/ZonAnn.Ts+dSST.csv');
  return await resp.text();
}

getData().then(table => {
  const rows = table.split('\n');

  //remove the first row
  rows.shift();

  rows.forEach(row => {
    const columns = row.split(',');

    const year = columns[0];
    const temperature = columns[1];

    addYearAndTempToPage(year, temperature);
  });
});

function addYearAndTempToPage(year, temperature) {
  const tempsSection = document.getElementById('temps');
  const pTag = document.createElement('p');

  pTag.innerText = `${year}: ${temperature}`;

  tempsSection.appendChild(pTag);
}
