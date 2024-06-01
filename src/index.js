function callInputValue(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form-input");
  let newCity = document.querySelector("#wheater-app-city");
  newCity.innerHTML = city.value;
}

let inputValue = document.querySelector("#search-form");
inputValue.addEventListener("submit", callInputValue);
