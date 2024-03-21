// script.js
document.getElementById('location-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const cityName = document.getElementById('search-input').value;
  getWeather(cityName);
});

async function getWeather(cityName) {
  try {
    const apiKey = '4dc4214d2342714dcb40dbcce303a738'; // Replace with your actual API key
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`,
    );
    const data = await response.json();

    const currentWeather = {
      temperature: data.main.temp,
      description: data.weather[0].description,
    };

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`,
    );
    const forecastData = await forecastResponse.json();

    const forecast = forecastData.list
      .map((item) => ({
        date: item.dt_txt,
        temperature: item.main.temp,
        description: item.weather[0].description,
      }))
      .filter((item, index) => index % 8 === 0); // Filter to get one forecast per day

    displayCurrentWeather(currentWeather);
    displayForecast(forecast);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

const displayCurrentWeather = (weather) => {
  const weatherDetails = document.getElementById('weather-details');
  weatherDetails.innerHTML = `
      <table>
        <tr>
          <th>Temperature</th>
          <td>${weather.temperature}°C</td>
        </tr>
        <tr>
          <th>Description</th>
          <td>${weather.description}</td>
        </tr>
      </table>
    `;
};

const displayForecast = (forecast) => {
  const forecastDetails = document.getElementById('forecast-details');
  forecastDetails.innerHTML = `
      <table>
        <tr>
          <th>Date</th>
          <th>Temperature</th>
          <th>Description</th>
        </tr>
        ${forecast
          .map(
            (day) => `
          <tr>
            <td>${day.date}</td>
            <td>${day.temperature}°C</td>
            <td>${day.description}</td>
          </tr>
        `,
          )
          .join('')}
      </table>
    `;
};
