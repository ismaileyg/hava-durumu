const App = {

  async search(cityInput) {
    const city = cityInput || document.getElementById("cityInput").value;

    showLoading();

    const res = await API.weather(city);
    const data = await res.json();

    if (data.cod !== 200) {
      hideLoading();
      alert(data.message);
      return;
    }

    UI.renderCurrent(data);

    const forecastRes = await API.forecast(city);
    const forecastData = await forecastRes.json();

    UI.renderForecast(forecastData);

    hideLoading();
  },

  geo() {
    navigator.geolocation.getCurrentPosition(async pos => {

      showLoading();

      const { latitude, longitude } = pos.coords;

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();

      UI.renderCurrent(data);

      hideLoading();
    });
  }
};

function showLoading() {
  document.getElementById("loading").classList.remove("hidden");
}

function hideLoading() {
  document.getElementById("loading").classList.add("hidden");
}

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("splash")?.remove();
  }, 3000);
});

window.App = App;