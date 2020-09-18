export function downloadMeme(memeUrl, fileName) {
  const myHeaders = new Headers();
  myHeaders.append('Origin', '');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  fetch(memeUrl, requestOptions)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const aTagElement = document.createElement('a');
      aTagElement.href = url;
      aTagElement.download = `${fileName}.jpg`;
      document.body.appendChild(aTagElement); // we need to append the element to the dom -> otherwise it will not work in firefox
      aTagElement.click();
      aTagElement.remove(); //afterwards we remove the element again
    });
}

export function textNormalizer(text) {
  let newText;
  newText = text.replace(/\?/g, '~q');
  newText = newText.replace(/%/g, '~p');
  newText = newText.replace(/\//g, '~s');
  newText = newText.replace(/#/g, '~h');
  newText = newText.replace(/"/g, "''");
  newText = newText.replace(/_/g, '__');
  newText = newText.replace(/-/g, '--');
  return newText;
}
