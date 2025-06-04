const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".error");
const weatherQuestion = document.querySelector(".weather-question");

search.addEventListener("click", () => {
  weatherQuestion.classList.add("fade-out"); // fades out weather-question upon click

  const APIKey = "3f938601027aa20215e48a03ccbdee6b";
  const city = document.querySelector(".search-box input").value;

  if (city === "") {
    return;
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        // display error message, hide everything else
        container.style.height = "400px"; // adjusts container height
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      // hide error message, display normally
      container.style.height = "400px"; // adjusts container height
      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");
      error404.classList.remove("active");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      let weather = json.weather[0].main; // use of weather API
      let isNight = json.dt < json.sys.sunrise || json.dt > json.sys.sunset; // determine if night based on sunrise/sunset times

      updateBackground(weather, isNight); // call background function

      if (isNight) {
        // if night, show moon icon
        image.src = "icons/moon.png";
      } else {
        // else, display icons normally
        switch (weather) {
          case "Clear":
            image.src = "icons/sun.png";
            break;
          case "Clouds":
          case "Mist":
          case "Haze":
            image.src = "icons/cloud.png";
            break;
          case "Rain":
            image.src = "icons/rain.png";
            break;
          case "Snow":
            image.src = "icons/snow.png";
            break;
          case "Thunderstorm":
            image.src = "icons/thunder.png";
            break;
          default:
            image.src = "icons/sun.png";
            break;
        }
      }
      // display weather details based on API
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;
    });
});

// update background when icon changes
function updateBackground(weather, isNight) {
  const body = document.body;
  // if night, show night background regardless of weather
  if (isNight) {
    switch (weather) {
      case "Clear":
      case "Clouds":
      case "Snow":
        body.style.background = "url('images/night-bg.png')";
        break;
      case "Mist":
      case "Haze":
        body.style.background = "url('images/mist-bg.png')";
        break;
      case "Rain":
        body.style.background = "url('images/rain-bg.gif')";
        break;
      case "Thunderstorm":
        body.style.background = "url('images/thunder-bg.gif')";
        break;
    }
  } else {
    // else, display background normally
    switch (weather) {
      case "Clear":
        body.style.background = "url('images/sun-bg.gif')";
        break;
      case "Clouds":
        body.style.background = "url('images/cloud-bg.png')";
        break;
      case "Rain":
        body.style.background = "url('images/rain-bg.gif')";
        break;
      case "Mist":
      case "Haze":
        body.style.background = "url('images/mist-bg.png')";
        break;
      case "Snow":
        body.style.background = "url('images/snow-bg.gif')";
        break;
      case "Thunderstorm":
        body.style.background = "url('images/thunder-bg.gif')";
        break;
      default:
        body.style.backgroundColor = "lightslategrey";
        return;
    }
    // determine background positions
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundSize = "100% 100%";
  }
}
