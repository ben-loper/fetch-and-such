async function getPoem() {
  const resp = await fetch('poem.txt');
  return await resp.text();
}

//Call getPoem method and use the return poem text to add to the website
getPoem().then(poem => {
  const pTag = document.createElement('p');
  pTag.innerText = poem;

  const poemDiv = document.getElementById('poem');
  poemDiv.appendChild(pTag);
});
