const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Insert your OpenWeatherMap API key
const searchBox = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherBox = document.getElementById("weather");

async function checkWeather(city) {
  if (!city) return;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (response.status === 404) {
      alert("City not found!");
      return;
    }

    const data = await response.json();

    document.getElementById("city").innerText = data.name;
    document.getElementById("temp").innerText = Math.round(data.main.temp) + "°c";
    document.getElementById("description").innerText = data.weather[0].description;
    document.getElementById("humidity").innerText = data.main.humidity + "%";
    document.getElementById("wind").innerText = data.wind.speed + " km/h";

    weatherBox.style.display = "block";
  } catch (error) {
    alert("Error fetching weather data. Please check your API key.");
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});