function refreshWheater(response) {
  let temperature = document.querySelector("#wheater-app-temperture-value");
  let actualTemperature = response.data.temperature.current;
  let newCity = document.querySelector("#wheater-app-city");
  newCity.innerHTML = response.data.city;
  let desciptionElement = document.querySelector("#desciption");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let time = new Date(response.data.time * 1000);

  dateElement.innerHTML = formatDate(time);
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  desciptionElement.innerHTML = response.data.condition.description;
  temperature.innerHTML = Math.round(actualTemperature);
  console.log(response.data);
}

function formatDate(time) {
  let minutes = time.getMinutes();
  let hours = time.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[time.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
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
