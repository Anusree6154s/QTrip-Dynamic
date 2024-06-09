import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  const city = params.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let res = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let div = document.getElementById("data");

  div.innerHTML = "";
  div.classList.add("p-0");

  adventures.forEach((adventure) => {
    let card = `<div class='col-6 col-md-3 mb-4' style='position:relative'>  <span class='category-banner'>${adventure.category}</span> <a href='detail/?adventure=${adventure.id}' class='activity-card' id='${adventure.id}'> <img class=='card-img-top' src='${adventure.image}'></img> <div class='card-body'> <div class=' d-flex justify-content-between'><h6 class='card-title d-flex justify-content-between'>${adventure.name}</h6> <h6 class='card-text text-end'>₹${adventure.costPerHead}</h6></div> <div class=' d-flex justify-content-between'><h6 class='card-title'>Duration</h6> <h6 class='card-text'>${adventure.duration}</h6></div> </div> </a></div>`;
    div.innerHTML = div.innerHTML + card;
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter((item) => item.duration >= low && item.duration <= high); // filter method doesnt alter the array in place
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter((item) => categoryList.includes(item.category));
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByDurationAndCategory(list, low, high, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Duration and Category and return filtered list
  return list.filter(
    (item) =>
      item.duration >= low &&
      item.duration <= high &&
      categoryList.includes(item.category)
  );
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  if (filters.duration.length !== 0 && filters.category.length !== 0) {
    // filter by duration and category
    let low = Number(filters.duration.split("-")[0]);
    let high = Number(filters.duration.split("-")[1]);
    let filteredList = filterByDurationAndCategory(
      list,
      low,
      high,
      filters.category
    );
    return filteredList;
  } else if (filters.duration.length !== 0) {
    //filter by duration only
    let low = Number(filters.duration.split("-")[0]);
    let high = Number(filters.duration.split("-")[1]);
    let filteredList = filterByDuration(list, low, high);
    return filteredList;
  } else if (filters.category.length !== 0) {
    //filter by category only
    let filteredList = filterByCategory(list, filters.category);
    return filteredList;
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(localStorage.getItem("filters"));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters, adventures) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  //1.a. Update the Duration Filter value

  //1.b. Generate Category Pills

  if (filters.category.length !== 0) {
    let div = document.getElementById("category-list");
    filters.category.forEach((item) => {
      let pill = `<div class='category-filter position-relative pb-2'> <button id='${item}' class='category-button'>x</button><span'>${item}</span></div>`;
      div.innerHTML += pill;
    });
  }

  Array.from(document.getElementsByClassName("category-button")).forEach(
    (button) => {
      button.addEventListener("click", function () {
        //edit the category pills
        this.parentElement.remove();

        //edit filters.category in place
        let index = filters.category.findIndex((item) => item === this.id);
        filters.category.splice(index, 1);

        //edit category in DOM
        let filteredAdventures = filterFunction(adventures, filters);
        addAdventureToDOM(filteredAdventures);
      });
    }
  );

 
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
