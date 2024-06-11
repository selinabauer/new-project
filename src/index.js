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
  let iconElement = document.querySelector("#wheater-app-icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="wheater-app-icon"/>`;
  dateElement.innerHTML = formatDate(time);
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  desciptionElement.innerHTML = response.data.condition.description;
  temperature.innerHTML = Math.round(actualTemperature);
  console.log(response.data);
  getForecast(response.data.city);
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

function getForecast(city) {
  let apiKey = "f4t0o3b00c8eabf0c1910e4852f5c3b5";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#weather-forecast");
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="row">
      <div class="col-sm">
              <div class="weather-forecast-day">${day}</div>
              <img
              class="weather-forecast-icon"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAepJREFUaN7tmd2thCAQhSnBEijBEmjgJpZgCZZgCZZgCXZwLcFX3yiBDlhIhhvC5dcdFzeB5LzsTtjz4cwwZomUknyzSANoAA2gATQANICSdZ4nA/Wk0ioGUGY7pVVJKElLXGl6NIAySMGojGh9MsCRMG80Pw5AmRozzRvppzVoGNCk068mwFYI4JPArpMSgB0BwGj5doAVutnsdDNdYwwVAH5o8rTNqzoyGsKIAqAvKETjRkNGQxC5BR8EuMm8vJCO0cKPAXBs83DyXcF9YmvKBoDHfIf5/o2DESUAM7L5HU6eez4fraFwzEwvYQo9BLDfcPrM2dek02jd1vZnOfuyEMCKaH52OwqMGaF04vBdDsQaApgQT546Jy9g/1gtcHgSqUxYQgD0xrwvgR9gn5D6WBtdEC6s6e55KQbQWd3hijqECVakxoq33okzXj03pFpiNQCOT4zfSYCf35MprUpHaBMrhltzlKwOoAx1SkJJgnqPeR3DrRhmXYZY6q8CLJaxP3NOzOzEjOSDKwigT9sxtnvM01RMTYDdMUc9AG5M/wgAnQaOsdljfnBiFlJh/QPwFK4u0C5RuMKNqQngFu7wtMJNAYhUUebE1ATYYoULAFvNwk0BmFuVZty8lFRe7S+mBtAAGkADeFsvKpKWeAy6FowAAAAASUVORK5CYII="
              />
              <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature-max">18°C </div> 

                <div class="weather-forecast-temperature-min">12°C</div>
              </div>
              </div>
              </div>
          </div>`;
  });
  forecastElement.innerHTML = forecastHTML;
}
