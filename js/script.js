fetch('data/weather.json') 
  .then(response => response.json()) 
  .then(data => renderWeather(data)) 
  .catch(error => 
    console.error('Помилка завантаження даних:', error)); 
  
function renderWeather(data) { 
  const current = document.getElementById('current-weather'); 
  current.innerHTML = ` 
    <h2>${data.city}</h2> 
    <p>${data.current.temperature_c}°C, 
    ${data.current.condition}</p>`; 
  
  const forecast = document.getElementById('forecast'); 
  forecast.innerHTML = data.forecast_5_days
  .map(day => `<p>${day.date}: ${day.temp_min_c}…${day.temp_max_c}°C, 
${day.condition}</p>`) 
    .join(''); 
} 

function renderWeekForecast() {
    fetch('data/week-forecast.json')
        .then(response => response.json())
        .then(days => {
            const grid = document.getElementById('week-forecast-grid');
            grid.innerHTML = days.map(d => `
                <div class="day-card">
                    <div class="day-name">${d.day}</div>
                    <div class="icon">${skyIcon(d.sky)}</div>
                    <div class="temp">${d.temp}°C</div>
                </div>
            `).join('');
        });
}

function skyIcon(sky) {
    const icons = {
        'Сонячно': '☀',
        'Ясно': '🌤',
        'Хмарно': '☁',
        'Дощ': '🌧'
    };
    return icons[sky] || '';
}

document.addEventListener('DOMContentLoaded', renderWeekForecast);
