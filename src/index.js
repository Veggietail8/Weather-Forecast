function refreshTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();
  console.log(day, currentHour, currentMinute);

  // Format the minutes when it's less than 10
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let dayElement = document.querySelector("#current-day");
  let hourElement = document.querySelector("#current-hour");
  let minuteElement = document.querySelector("#current-minute");
  dayElement.innerHTML = day;
  hourElement.innerHTML = currentHour;
  minuteElement.innerHTML = currentMinute;
}

function refreshWeather(response) {
  // Update the current temperature
  let tempNumberElement = document.querySelector("#weather-app-temp-number");
  let currentTemp = response.data.temperature.current;
  tempNumberElement.innerHTML =
    Math.round(currentTemp); /*rounding up the temperature*/

  // Update the city name
  let cityElement = document.querySelector("h1.weather-app-city");
  cityElement.innerHTML =
    response.data.city; /*Displaying the city name as how it's shown in the API, not how it's typed by the user*/

  // Update the humidity
  let humidityPercentElement = document.querySelector("#humidity-number");
  let currentHumidity = response.data.temperature.humidity;
  humidityPercentElement.innerHTML = `${currentHumidity}%`;

  // Update the wind speed
  let windSpeedElement = document.querySelector("#wind-number");
  let currentWind = response.data.wind.speed;
  windSpeedElement.innerHTML = `${currentWind}km/h`;

  // Update the weather condition description
  let weatherConditionElement = document.querySelector(
    "#weather-condition-description"
  );
  let currentWeatherCondition = response.data.condition.description;
  weatherConditionElement.innerHTML = currentWeatherCondition;

  // Update the weather icon
  let weatherIconElement = document.querySelector("#weather-app-temp-icon");
  let currentWeatherIconUrl = response.data.condition.icon_url;
  weatherIconElement.innerHTML = `<img src=${currentWeatherIconUrl} alt="Icon"></img>`;

  refreshTime();
}

//Receiving the search input value and look for the city-specific API; Call the API, and trigger the function which refreshes data on the UI
function searchCity(city) {
  let apiKey = "836444o057f4ft35027a7882a9606bb0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input-element");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Vancouver"); /*Display a default city when the page is refreshed*/
