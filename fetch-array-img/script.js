async function fetchPicts() {
  console.log('Fetching your pictures...');

  const fileNames = ['abstract.jpg', 'flower.jpg', 'umbrellas.jpg'];

  const imgDiv = document.getElementById('images');

  for (let i = 0; i < fileNames.length; i++) {
    const filePath = `imgs/${fileNames[i]}`;
    const resp = await fetch(filePath);
    const blob = await resp.blob();
    const imgSrc = URL.createObjectURL(blob);

    const imgTag = document.createElement('img');

    imgTag.src = imgSrc;

    imgDiv.appendChild(imgTag);
  }
}

fetchPicts();
