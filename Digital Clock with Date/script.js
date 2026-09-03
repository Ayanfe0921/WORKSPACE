const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');

function updateClock() {
  const now = new Date();

  // Format Time
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // convert '0' to '12'
  const hoursStr = String(hours).padStart(2, '0');

  timeEl.textContent = `${hoursStr}:${minutes}:${seconds} ${ampm}`;

  // Format Date
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  dateEl.textContent = now.toLocaleDateString('en-US', options);
}

setInterval(updateClock, 1000);
updateClock();