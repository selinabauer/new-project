function refreshWheater(response) {
  let temperature = document.querySelector("#wheater-app-temperture-value");
  let actualTemperature = response.data.temperature.current;
  let newCity = document.querySelector("#wheater-app-city");
  newCity.innerHTML = response.data.city;

  temperature.innerHTML = Math.round(actualTemperature);
}

function searchCity(city) {
  let apiKey = "f4t0o3b00c8eabf0c1910e4852f5c3b5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWheater);
}

function callInputValue(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#search-form-input");

  searchCity(currentCity.value);
}

let inputValue = document.querySelector("#search-form");
inputValue.addEventListener("submit", callInputValue);
searchCity("Bern");
