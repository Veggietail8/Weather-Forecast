function refreshWeather(response) {
  console.log(response.data);
  let tempNumberElement = document.querySelector("#weather-app-temp-number");
  let humidityPercentElement = document.querySelector("#humidity-number");
  let windSpeedElement = document.querySelector("#wind-number");
  let weatherConditionElement = document.querySelector(
    "#weather-condition-description"
  );

  let currentTemp = response.data.temperature.current;
  let currentHumidity = response.data.temperature.humidity;
  let currentWind = response.data.wind.speed;
  let currentWeatherCondition = response.data.condition.description;

  tempNumberElement.innerHTML = currentTemp;
  humidityPercentElement.innerHTML = `${currentHumidity}%`;
  windSpeedElement.innerHTML = `${currentWind}km/h`;
  weatherConditionElement.innerHTML = currentWeatherCondition;
}

function searchCity(city) {
  let apiKey = "836444o057f4ft35027a7882a9606bb0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input-element");
  let cityElement = document.querySelector("h1.weather-app-city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
