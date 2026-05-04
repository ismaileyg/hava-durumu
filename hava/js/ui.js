const UI = {

  renderCurrent(data) {

    document.getElementById("current").innerHTML = `
      <h2>${data.name}</h2>
      <h1>${Math.round(data.main.temp)}°C</h1>
      <p>🌡 Hissedilen: ${Math.round(data.main.feels_like)}°</p>
      <p>💧 Nem: ${data.main.humidity}%</p>
      <p>🌬 Basınç: ${data.main.pressure}</p>
      <div class="weather-icon">🌤</div>
    `;

    setTheme(data.weather[0].main);
  },

  renderForecast(data) {

    const hourly = document.getElementById("hourly");
    const daily = document.getElementById("daily");

    hourly.innerHTML = "";
    daily.innerHTML = "";

    const list = data.list;

    
    list.slice(0, 6).forEach(i => {
      const time = i.dt_txt.split(" ")[1].slice(0,5);

      hourly.innerHTML += `
        <div class="item">
          <div>${time}</div>
          <div>${Math.round(i.main.temp)}°</div>
        </div>
      `;
    });

    
    const grouped = {};

    list.forEach(i => {
      const d = i.dt_txt.split(" ")[0];
      if (!grouped[d]) grouped[d] = [];
      grouped[d].push(i);
    });

    Object.keys(grouped).slice(0,5).forEach(date => {

      const temps = grouped[date].map(x => x.main.temp);
      const avg = temps.reduce((a,b)=>a+b)/temps.length;

      const day = new Date(date).toLocaleDateString("tr-TR", {
        weekday: "short"
      });

      daily.innerHTML += `
        <div class="item">
          <div>${day}</div>
          <div>${Math.round(avg)}°</div>
        </div>
      `;
    });
  }
};


function setTheme(weather) {
  document.body.classList.remove("rain","sun","clouds");

  const w = weather.toLowerCase();

  if (w.includes("rain")) document.body.classList.add("rain");
  else if (w.includes("clear")) document.body.classList.add("sun");
  else document.body.classList.add("clouds");
}