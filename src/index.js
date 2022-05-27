//Current date
function formattedDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = days[date.getDay()];
  let actualdate = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minuets = date.getMinutes();
  if (minuets < 10) {
    minuets = `0${minuets}`;
  }

  let fullDateFormatted = `Last updated: ${day} ${actualdate} ${month} ${year} ${hour}:${minuets}`;

  return fullDateFormatted;
}

function formatFutureDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

//Search city

function search(city) {
  let apiKey = "9a24724f0b63770692652be5b580b59b";
  let units = "metric";
  let endPointUrl = "https://api.openweathermap.org/data/2.5/weather";
  let apiWeatherUrl = `${endPointUrl}?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiWeatherUrl).then(showWeather);
}
function enterCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

//Use current location

function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "9a24724f0b63770692652be5b580b59b";
  let units = "metric";
  let EndPointUrl = "https://api.openweathermap.org/data/2.5/weather";
  let apiWeatherUrl = `${EndPointUrl}?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;

  axios.get(apiWeatherUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

//Forecast API

function getForecast(coordinates) {
  let apiKey = "9a24724f0b63770692652be5b580b59b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

//Weather details

function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#current-desc").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#current-min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#current-wind").innerHTML = response.data.wind.speed;
  document.querySelector("#date-time").innerHTML = formattedDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#current-image")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#current-image")
    .setAttribute("alt", response.data.weather[0].main);

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let farenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemp);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

//Future forecast
function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if ((index > 0) & (index < 7)) {
      forecastHTML =
        forecastHTML +
        `     
                    <div class="col-2">
                      <div class="future-day">${formatFutureDay(
                        forecastDay.dt
                      )}</div>
                      <img
                        src="http://openweathermap.org/img/wn/${
                          forecastDay.weather[0].icon
                        }@2x.png"
                        alt="Sunny"
                        width="60px"
                      />
                      <div class="future-temp">
                        <span class="future-max"> ${Math.round(
                          forecastDay.temp.max
                        )}° </span>
                        <span class="future-min"> ${Math.round(
                          forecastDay.temp.min
                        )}° </span>
                      </div>
                    </div>
                `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Current date
//let changeDate = document.querySelector("#date-time");
//changeDate.innerHTML = formattedDate(new Date());

//Search city
let selectedCityEnter = document.querySelector("#search-city");
selectedCityEnter.addEventListener("submit", enterCity);

let selectedCityClick = document.querySelector("#search-button");
selectedCityClick.addEventListener("click", enterCity);

//Use current location
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Unit conversions
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#farenheit-link");
fahrenheitLink.addEventListener("click", convertToFarenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//default search
search("London");
