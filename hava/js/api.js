const API_KEY = "e2e822002f84c79991e9818b1c73b571";

const API = {
  weather: (city) =>
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=tr`),

  forecast: (city) =>
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=tr`)
};