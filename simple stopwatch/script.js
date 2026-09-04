let timer = null;
let seconds = 0;
let minutes = 0;
let hours = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;

  display.textContent = `${h}:${m}:${s}`;
}

function stopwatch() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  updateDisplay();
}

startBtn.addEventListener("click", () => {
  if (timer !== null) {
    clearInterval(timer);
  }
  timer = setInterval(stopwatch, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(timer);
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  seconds = 0;
  minutes = 0;
  hours = 0;
  updateDisplay();
});