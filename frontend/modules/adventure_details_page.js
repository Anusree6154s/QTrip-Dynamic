import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  if (search) {
    const params = new URLSearchParams(search);
    return params.get("adventure");
  }

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  if (adventureId) {
    try {
      let res = await fetch(
        config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
      );
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  document.getElementById("adventure-content").innerHTML = adventure.content;

  adventure.images.forEach(
    (item) =>
      (document.getElementById("photo-gallery").innerHTML += ` 
        <img src="${item}" class="activity-card-image">
    `)
  );
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner"></div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
`;

  let carouselInner = document.getElementsByClassName("carousel-inner")[0];
  images.forEach(
    (item) =>
      (carouselInner.innerHTML += ` 
      <div class="carousel-item">
        <img src="${item}" class="d-block w-100 activity-card-image" alt="...">
      </div>
    `)
  );

  let carouselItem = document.getElementsByClassName("carousel-item")[0];
  carouselItem.classList.add("active");
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document
      .getElementById("reservation-panel-sold-out")
      .setAttribute("style", "display:none");
    document
      .getElementById("reservation-panel-available")
      .setAttribute("style", "display:block");
    document.getElementById("reservation-person-cost").innerHTML =
      adventure.costPerHead;

    let personsCount = document.getElementsByName("person")[0].value;
    document.getElementById("reservation-cost").innerHTML =
      adventure.costPerHead * personsCount;
  } else {
    document
      .getElementById("reservation-panel-sold-out")
      .setAttribute("style", "display:block");
    document
      .getElementById("reservation-panel-available")
      .setAttribute("style", "display:none");
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementsByName("person")[0].setAttribute("value", persons);
  conditionalRenderingOfReservationPanel(adventure);
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  document.getElementById("myForm").addEventListener("submit", postData);

  async function postData(event) {
    event.preventDefault();

    const name = document.getElementsByName("name")[0].value;

    const date = document.getElementsByName("date")[0].value;
   
    const person = document.getElementsByName("person")[0].value;

    const data = {
      adventure: adventure.id,
      name: name,
      date: date,
      person: person,
    };
    console.log(data);
    try {
      let res = await fetch(config.backendEndpoint + "/reservations/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(res);
      if (res.ok) {
        alert("Success!");
        window.location.reload(); // Refresh the page
      } else {
        alert("Failed!");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log(adventure);
  if (adventure.reserved) {
    document
      .getElementById("reserved-banner")
      .setAttribute("style", "display:block");
  } else {
    document
      .getElementById("reserved-banner")
      .setAttribute("style", "display:none");
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
