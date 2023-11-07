document.addEventListener("DOMContentLoaded", () => {
  const amenities = {};
  const checkboxes = document.querySelectorAll("li input[type=checkbox]");
  const amenitiesText = document.querySelector(".amenities h4");
  const apiStatusDiv = document.querySelector("div#api_status");
  const placesSection = document.querySelector("section.places");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        amenities[checkbox.dataset.name] = checkbox.dataset.id;
      } else {
        delete amenities[checkbox.dataset.name];
      }

      amenitiesText.textContent = Object.keys(amenities).sort().join(", ");
    });
  });

  // Get the status of the API
  fetch("http://0.0.0.0:5001/api/v1/status/")
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "OK") {
        apiStatusDiv.classList.add("available");
      } else {
        apiStatusDiv.classList.remove("available");
      }
    })
    .catch((error) => console.error(error));

  // Fetch data about places
  const searchPlace = () => {
    const HOST = "http://your-api-host"; // Replace with your actual API host

    fetch(`${HOST}/api/v1/places_search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        placesSection.innerHTML = ""; // Clear existing content
        data.forEach((place) => {
          placesSection.innerHTML += `
            <article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${
                  place.max_guest !== 1 ? "s" : ""
                }</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${
                  place.number_rooms !== 1 ? "s" : ""
                }</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
                  place.number_bathrooms !== 1 ? "s" : ""
                }</div>
              </div>
              <div class="description">${place.description}</div>
            </article>
          `;
        });
      })
      .catch((error) => console.error(error));
  };

  // Search places when the button is clicked
  const searchButton = document.querySelector(".filters button");
  searchButton.addEventListener("click", searchPlace);

  // Initial search
  searchPlace();
});
