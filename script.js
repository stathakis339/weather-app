// API Key από το OpenWeatherMap
const apiKey = "f65c9d2be1b9696dcc67b56c28d52dcd";

// Παίρνουμε τα elements από το HTML
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const error = document.getElementById("error");

// Η κύρια function που παίρνει τον καιρό
const getWeather = async () => {
  const city = cityInput.value;

  // Αν δεν έχει γράψει πόλη
  if (city === "") {
    error.textContent = "⚠️ Γράψε μια πόλη!";
    results.style.display = "none";
    return;
  }

  try {
    // Fetch από το API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=el`
    );
    const data = await response.json();

    // Αν η πόλη δεν βρέθηκε
    if (data.cod === "404") {
      error.textContent = "❌ Η πόλη δεν βρέθηκε!";
      results.style.display = "none";
      return;
    }

    // Εμφάνιση αποτελεσμάτων
    error.textContent = "";
    results.style.display = "block";
    cityName.textContent = `📍 ${data.name}, ${data.sys.country}`;
    temperature.textContent = `🌡️ ${data.main.temp}°C`;
    description.textContent = `☁️ ${data.weather[0].description}`;
    humidity.textContent = `💧 Υγρασία: ${data.main.humidity}%`;
    wind.textContent = `💨 Άνεμος: ${data.wind.speed} m/s`;
  } catch (err) {
    error.textContent = "❌ Κάτι πήγε στραβά!";
  }
};

// Click στο κουμπί
searchBtn.addEventListener("click", getWeather);

// Enter στο πληκτρολόγιο
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather();
});
