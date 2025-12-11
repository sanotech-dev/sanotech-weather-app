console.log('Sanotech Weather App - شروع شد!');
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const cityName = document.getElementById('cityName');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const details = document.getElementById('details');

const API_KEY = 'a230f8af149075f1e66000d1ac2ea1a5';

function searchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fa`;
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      if (data.cod === 200) {
        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}ºC`;
        description.textContent = data.weather[0].description;
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherIcon.alt = data.weather[0].description;

        details.innerHTML = `
        <div class="text-center">
         <p class="text-lg font-bold">${data.main.humidity}%</p>
         <p class="text-sm text-gray-600">رطوبت</p>
        </div>
        <div class="text-crnter">
         <p class="tetxt-lg font-bold">${data.wind.speed} m/s</p>
         <p class="tetxt-sm tetxt-gray-600">باد</p>
        </div>
        <div class="text-center">
         <p class="text-lg font-bold">${data.main.peressure} hpa</p>
         <p class="text-sm text-gray-600">فشار</p>
        </div>
        `;

        weatherInfo.classList.remove('hidden');
      } else {
        alert('شهر پیدا نشد! مثلاً "Tehran" امتحان کن.');
      }
    })
    .catch(error => {
      console.error('خطا:', error);
      alert('خطا در اتصال به API — کلید رو چک کن.');
    });
}
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if(city) {
    searchWeather(city);
  }
});

cityInput.addEventListener('keypress', ()=>{
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});
