let currentDate = new Date();

let currentMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dez",
];
let month = currentMonths[currentDate.getMonth()];

let currentDay = currentDate.getDate();

let currentWeekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentHour = currentDate.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = currentDate.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute} `;
}

let weekDay = currentWeekDay[currentDate.getDay()];

let newMonth = document.querySelector("#month-day");
newMonth.innerHTML = `${month}  ${currentDay} `;

let weekDayNow = document.querySelector("#week-day");
weekDayNow.innerHTML = `${weekDay}`;

let currentTime = document.querySelector("#hour");

currentTime.innerHTML = `${currentHour} : ${currentMinute}`;

function getWeather(response) {
  let weather = Math.round(response.data.main.temp);
  let city = response.data.name;
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let description = response.data.weather[0].description;

  let newTemperature = document.querySelector("#current-temperature");
  newTemperature.innerHTML = `${weather}`;

  let newCity = document.querySelector("h1");
  newCity.innerHTML = `${city}`;

  let newDescription = document.querySelector("#current-description");
  newDescription.innerHTML = `${description}`;

  let newHumidity = document.querySelector("#current-humidity");
  newHumidity.innerHTML = `Humidity: ${humidity}%`;

  let newWind = document.querySelector("#current-wind");
  newWind.innerHTML = `Wind: ${wind}mph`;
}

function newCity(event) {
  event.preventDefault();
  let cityForm = document.querySelector("#city-name");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityForm.value}`;

  let apiKey = "2bc6b4fefdb04abbb3ef0da316d15f59";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityForm.value}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(getWeather);
}

let city = document.querySelector("#enter-city");
city.addEventListener("submit", newCity);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2bc6b4fefdb04abbb3ef0da316d15f59";
  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(getWeather);
}

function currentLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentLocationWeather);
