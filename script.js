const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "786d9d482bdeaf5a5d89f84aa0f4db56";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === '404') {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("error");
            return;
        }
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

        switch (weather_data.weather[0].main.toLowerCase()) {
            case 'clouds':
                weather_img.src = "/assets/cloud.jpg";
                break;
            case 'clear':
                weather_img.src = "/assets/clear.jpg";
                break;
            case 'rain':
                weather_img.src = "/assets/rain.jpg";
                break;
            case 'mist':
                weather_img.src = "/assets/smoke.jpg";
                break;
            case 'snow':
                weather_img.src = "/assets/snow.jpg";
                break;
            default:
                weather_img.src = "/assets/default.jpg";
                break;
        }
        console.log(weather_data);
    } catch (error) {
        console.error(error);
        alert('Failed to fetch weather data!');
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
