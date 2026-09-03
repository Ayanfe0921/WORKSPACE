const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const currentYear = new Date().getFullYear();
const targetDate = new Date(`January 1 ${currentYear + 1} 00:00:00`);

function updateCountdown() {
  const currentTime = new Date();
  const diff = targetDate - currentTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  daysEl.innerHTML = d < 10 ? '0' + d : d;
  hoursEl.innerHTML = h < 10 ? '0' + h : h;
  minutesEl.innerHTML = m < 10 ? '0' + m : m;
  secondsEl.innerHTML = s < 10 ? '0' + s : s;
}

setInterval(updateCountdown, 1000);
updateCountdown();