function search(city) {
  let apiKey = "2ftf8d18ca43a10o8bf09c1a6bc39253";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=2ftf8d18ca43a10o8bf09c1a6bc39253`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayDescription() {
  let descriptionElement = document.querySelector("#description");
  let days = ["Thu", "Fri", "Sat", "Sun"];
  let descriptionHTML = `<div class = "row">`;
  days.forEach(function (day) {
    descriptionHTML =
      descriptionHTML +
      `<div class="col-2">
              <div class="weather-forecast-date">
                ${day}
             </div>
              <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="" width = "42"/>
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">
                  18°
                </span>
                <span class="weather-forecast-temperature-min">
                  12°
                </span>
              </div>
        </div>`;
  });
  descriptionHTML = descriptionHTML + `</div>`;
  descriptionElement.innerHTML = descriptionHTML;
}
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml= `<div class="row">`;
  // let days=["Thu","Fry","Sat"];
  forecast.forEach(function(forecastDay){
    forecastHtml=forecastHtml +
    `<div class="col-2">
    <div class="weather-forecast-date">
        ${formatDate(forecastDay.dt)}
     </div>
    <div>
        <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" width="42"/>
    </div>
    <div class="weather-forecast-temperature">
        <span class="forecast-temperature-max">${forecastDay.temp.max} °</span>
        <span class="forecast-temperature-min">${forecastDay.temp.min}°</span>
    </div>
    </div>`
    ;
  
  })

  // forecastHtml=forecastHtml +
  // `<div class="col-2">
  // <div class="weather-forecast-date">
  //     Thu
  //  </div>
  // <div>
  //     <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="" width="42"/>
  // </div>
  // <div class="weather-forecast-temperature">
  //     <span class="forecast-temperature-max"> 18° </span>
  //     <span class="forecast-temperature-min"> 12°</span>
  // </div>
  // </div>`
  // ;
  forecastElement.innerHTML=forecastHtml + `</div>`;
  forecastElement.innerHTML=forecastHtml;

}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2ftf8d18ca43a10o8bf09c1a6bc39253";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  // axios.get(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
let celsiusTemperature = null;

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  // let precipitationElement = document.querySelector("#precipitation");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  precipitationElement = Math.round(response.data.temperature.precipitation);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    response.data.condition.icon_url
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}
search("Krakow");
displayForecast();
let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);