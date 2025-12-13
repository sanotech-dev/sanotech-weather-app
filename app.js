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

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if(city) {
    searchWeather(city);
  }
});

cityInput.addEventListener('keypress', (e)=>{
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});
function saveLastCity(city){
  localStorage.setItem("sanotech-last-city", city);
}
function loadLastCity() {
  const saved = localStorage.getItem("sanotech-last-city");
  if (saved) {
    cityInput.value = saved;
    searchWeather(saved);
  }
}

function showForecast(city) {
 const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=fa`;

 fetch(forecastUrl)
 .then(res => res.json())
 .then(data => {
  const forecastDiv = document.createElement("div");
  forecastDiv.className = "mt-8 grid grid-cols-2 sm:grid-cols-5 gap-4";

  const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  daily.slice(0, 5).forEach(day => {
    const date = new Date(day.dt * 1000).toLocaleDateString('fa-IR');
    const temp = Math.round(day.main.temp);
    const icon = day.weather[0].icon;

    forecastDiv.innerHTML += `

    <div class="bg-white/90 rounded-2xl p-4 text-center shadow-lg">
     <p class="font-bold text-sm">${date}</p>
      <img src="http://openweathermap.org/img/wn/${icon}.png" class="mx-auto w-12">
       <p class="text-2xl font-bold text-indigo-600">${temp}°</p>
    </div>
    `;
  });
  document.getElementById("weatherInfo").insertAdjacentElement("afterend", forecastDiv);
 });
}

function searchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fa`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.cod === 200) {

      cityName.textContent = data.name;
      temperature.textContent = `${Math.round(data.main.temp)}ºC`;
      description.textContent = data.weather[0].description;
      weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

      details.innerHTML = `<div class="text-center"><p class="text-xl font-bold">${data.main.humidity}%</p><p class="text-sm text-gray-600">رطوبت</p></div>
          <div class="text-center"><p class="text-xl font-bold">${data.wind.speed} m/s</p><p class="text-sm text-gray-600">باد</p></div>
          <div class="text-center"><p class="text-xl font-bold">${data.main.pressure} hPa</p><p class="text-sm text-gray-600">فشار</p></div>
          `;

          weatherInfo.classList.remove('hidden');

          saveLastCity(city);
          document.querySelectorAll(".forecast")?.forEach(el => el.remove());
          showForecast(city);
    } else {
      alert("شهر پیدا نشد! مثلاً Tehran امتحان کن");
    }
  })
  .catch(() => alert("خطا در اتصال — اینترنت یا API Key رو چک کن"));
}

loadLastCity();
