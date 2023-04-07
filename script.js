const baseURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const APIKey = "#####";

const weatherDiv = document.querySelector(".weather");
const detailsDiv = document.querySelector(".details");

const searchBox = document.querySelector("#search-box");
const searchBtn = document.querySelector("#search-btn");
const weatherImg = document.querySelector("#weather-img");

const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity-percent");
const speed = document.querySelector(".wind-speed");
const weatherData = document.querySelector(".weather-data");
const error = document.querySelector(".error");

weatherDiv.style.display = "none";
detailsDiv.style.display = "none";

searchBtn.addEventListener("click", () => {
  getWeatherData(searchBox.value);
});

async function getWeatherData(searchedCity) {
  console.log(baseURL + searchedCity + `&appid=${APIKey}`);
  const response = await fetch(baseURL + searchedCity + `&appid=${APIKey}`);
  const data = await response.json();

  if ((response.status == 404)) {
    error.style.display = "inline";
    weatherData.display = "none";
  } else {
    weatherDiv.style.display = "flex";
    detailsDiv.style.display = "grid";
    error.style.display = "none";

    temp.innerText = Math.round(data.main.temp) + "°C";
    city.innerText = data.name;
    humidity.innerText = data.main.humidity + "%";
    speed.innerText = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clear") {
      weatherImg.src = "/images/clear.png";
    } else if (data.weather[0].main == "Clouds") {
      weatherImg.src = "/images/clouds.png";
    } else if ((data.weather[0].main = "Drizzle")) {
      weatherImg.src = "/images/drizzle.png";
    } else if ((data.weather[0].main = "Mist")) {
      weatherImg.src = "/images/mist.png";
    } else if ((data.weather[0].main = "Rain")) {
      weatherImg.src = "/images/rain.png";
    } else if ((data.weather[0].main = "Snow")) {
      weatherImg.src = "/images/snow.png";
    }

    console.log(data.weather[0].main);
  }
}
