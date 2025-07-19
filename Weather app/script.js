// Replace with your OpenWeatherMap API key
const API_KEY = 'YOUR_API_KEY_HERE';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('weather-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const city = document.getElementById('city-input').value.trim();
  const loading = document.getElementById('loading');
  const error = document.getElementById('error');
  const weatherResult = document.getElementById('weather-result');

  // Reset states
  loading.classList.remove('hidden');
  error.classList.add('hidden');
  weatherResult.classList.add('hidden');

  try {
    const response = await fetch(`${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    
    if (!response.ok) {
      throw new Error('City not found or API error');
    }

    const data = await response.json();

    // Update DOM with weather data
    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    
    weatherResult.classList.remove('hidden');
  } catch (err) {
    error.textContent = err.message;
    error.classList.remove('hidden');
  } finally {
    loading.classList.add('hidden');
  }
});