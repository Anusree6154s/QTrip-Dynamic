import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let response = await fetch(config.backendEndpoint + "/cities");
    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let div = document.getElementById("data");
  let card = `<a class="tile" id="${id}" href="pages/adventures/?city=${id}"> <img src='${image}' ></img> <div class='tile-text' > <p>${city}</p> <p>${description}</p> </div></a>`;
  div.innerHTML = div.innerHTML + card;
  console.log(div);
}

export { init, fetchCities, addCityToDOM };
