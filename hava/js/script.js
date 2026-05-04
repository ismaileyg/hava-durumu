const apiKey = "e2e822002f84c79991e9818b1c73b571";

const result = document.getElementById("result");
const forecast = document.getElementById("forecast");
const body = document.body;


document.getElementById("cityInput").addEventListener("keypress",(e)=>{
  if(e.key==="Enter") getWeather();
});


async function getWeather(cityInput){
  const city = (cityInput || document.getElementById("cityInput").value).trim();

  if(!city){
    result.innerHTML="⚠️ şehir gir";
    return;
  }

  const url=`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=tr`;

  const res=await fetch(url);
  const data=await res.json();

  if(data.cod!==200){
    result.innerHTML="❌ "+data.message;
    return;
  }

  showWeather(data);
  getForecast(city);
}


async function getForecast(city){
  const url=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

  const res=await fetch(url);
  const data=await res.json();

  forecast.innerHTML="";

  data.list.slice(0,5).forEach(item=>{
    forecast.innerHTML+=`
      <div class="day">
        <p>${item.dt_txt.split(" ")[1]}</p>
        <p>${Math.round(item.main.temp)}°</p>
      </div>
    `;
  });
}


function getLocationWeather(){
  navigator.geolocation.getCurrentPosition(async(pos)=>{
    const lat=pos.coords.latitude;
    const lon=pos.coords.longitude;

    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=tr`;

    const res=await fetch(url);
    const data=await res.json();

    showWeather(data);
  });
}


function showWeather(data){
  const weather=data.weather[0].main;

  result.innerHTML=`
    <h2>${data.name}</h2>
    <p>🌡 ${data.main.temp}°C</p>
    <p>🌤 ${data.weather[0].description}</p>
  `;

  changeBg(weather);
  toggleRain(weather);
}


function changeBg(w){
  if(w==="Clear"){
    body.style.background="linear-gradient(135deg,#fceabb,#f8b500)";
  } else if(w==="Rain"){
    body.style.background="linear-gradient(135deg,#314755,#26a0da)";
  } else {
    body.style.background="radial-gradient(circle at top,#1f2937,#0f172a)";
  }
}


const canvas=document.getElementById("rainCanvas");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let drops=[];

for(let i=0;i<100;i++){
  drops.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    len:10+Math.random()*10
  });
}

function drawRain(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle="rgba(255,255,255,0.3)";

  drops.forEach(d=>{
    ctx.beginPath();
    ctx.moveTo(d.x,d.y);
    ctx.lineTo(d.x,d.y+d.len);
    ctx.stroke();

    d.y+=5;
    if(d.y>canvas.height){
      d.y=0;
    }
  });

  requestAnimationFrame(drawRain);
}

drawRain();


function toggleRain(w){
  canvas.style.display = (w==="Rain") ? "block" : "none";
}