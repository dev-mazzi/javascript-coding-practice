const container = document.querySelector('.container');
const form = document.querySelector('.search-box');
const weatherBox = document.querySelector('.weather-box');
const weatherDetail = document.querySelector('.weather-detail');
const notFound = document.querySelector('.not-found');

form.addEventListener('submit', (e) => {
    const APIKey = '3e92d2cd10eec69827f934b304056e4d';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod === '404') {
            container.style.height = '440px';
            weatherBox.style.display = 'none';
            weatherDetail.style.display = 'none';
            notFound.style.display = 'block';
            notFound.classList.add('fade-in');
            return;
        }

        notFound.classList.remove('fade-in');
        notFound.style.diplay = 'none';

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-detail .humidity span');
        const wind = document.querySelector('.weather-detail .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = './images/clear.png';
                break;

            case 'Rain':
                image.src = './images/rain.png';
                break;

            case 'Snow':
                image.src = './images/snow.png';
                break;

            case 'Clouds':
                image.src = './images/cloud.png';
                break;

            case 'Haze':
                image.src = './images/haze.png';
                break;

            default:
                image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${json.wind.speed}Km/h`;

        weatherBox.style.display = '';
        weatherDetail.style.display = '';
        weatherBox.classList.add('fade-in');
        weatherDetail.classList.add('fade-in');
        container.style.height = '500px';

    });

    e.preventDefault();
}
);