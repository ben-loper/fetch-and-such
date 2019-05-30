console.log('hi');

async function catchRainbow() {
  const resp = await fetch('rainbow.jpg');
  const blob = await resp.blob();

  const img = document.getElementById('rainbow');
  img.setAttribute('src', URL.createObjectURL(blob));
  img.setAttribute('width', 480);
}

catchRainbow();
