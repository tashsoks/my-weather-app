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

  let fullDateFormatted = `${day} ${actualdate} ${month} ${year} ${hour}:${minuets}`;

  return fullDateFormatted;
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
  document
    .querySelector("#cover-photo")
    .setAttribute("src", `images/${response.data.name}.jpg`);
  document
    .querySelector("#cover-photo")
    .setAttribute("alt", response.data.weather[0].main);
}

//Current date
//let changeDate = document.querySelector("#date-time");
//changeDate.innerHTML = formattedDate(new Date());

//Search city

search("London");

let selectedCityEnter = document.querySelector("#search-city");
selectedCityEnter.addEventListener("submit", enterCity);

let selectedCityClick = document.querySelector("#search-button");
selectedCityClick.addEventListener("click", enterCity);

//Use current location

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);
