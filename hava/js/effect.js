const canvas = document.getElementById("fx");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let drops = Array(120).fill().map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  l: Math.random() * 15 + 10
}));

function rain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(255,255,255,0.3)";

  drops.forEach(d => {
    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x, d.y + d.l);
    ctx.stroke();

    d.y += 6;
    if (d.y > canvas.height) d.y = 0;
  });

  requestAnimationFrame(rain);
}

rain();

function lightning() {
  document.body.classList.add("flash");
  setTimeout(() => document.body.classList.remove("flash"), 200);
}