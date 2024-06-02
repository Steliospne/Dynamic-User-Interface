function render() {
  const imgElement = document.createElement("img");
  const imgWrapper = document.createElement("div");
  const searchLabel = document.createElement("label");
  const search = document.createElement("input");
  const refreshButton = document.createElement("button");
  const elements = [imgWrapper, searchLabel, search, refreshButton];
  imgWrapper.append(imgElement);
  for (let element of elements) {
    document.body.append(element);
  }

  refreshButton.textContent = "Click Me!";
  refreshButton.addEventListener("click", getGIF);

  window.onload = function () {
    search.value = "cats";
    getGIF();
  };
}

function getGIF() {
  const img = document.querySelector("img");
  let searchTerm = document.querySelector("input").value.toLowerCase();
  let cleanSearchTerm = new RegExp(searchTerm, "i");
  cleanSearchTerm = cleanSearchTerm.toString().replace(/^\/|\/[a-z]*$/gi, "");
  const URL = `https://api.giphy.com/v1/gifs/translate?api_key=W5pF2Dg6aN2oyEC1eMPntCB8tkVdBWxo&s=${cleanSearchTerm}`;

  async function getData(URL) {
    try {
      const response = await fetch(URL, {
        mode: "cors",
      });
      const data = await response.json();
      img.src = data.data.images.original.url;
    } catch(err) {
      console.log(err)
      document.querySelector("div").textContent = err
    }
    
  }

  getData(URL);
}

module.exports.render = render;
