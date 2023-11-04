document.addEventListener("DOMContentLoaded", function () {
  const amenities = {};

  const checkboxes = document.querySelectorAll("li input[type=checkbox]");
  const amenitiesText = document.querySelector(".amenities h4");

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        amenities[this.dataset.name] = this.dataset.id;
      } else {
        delete amenities[this.dataset.name];
      }

      amenitiesText.textContent = Object.keys(amenities).sort().join(", ");
    });
  });
});
