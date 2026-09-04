// function playSound(e) {
//   const keyCode = e.keyCode || e.currentTarget.getAttribute("data-key");
//   const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
//   const key = document.querySelector(`.key[data-key="${keyCode}"]`);

//   if (!audio) return;

//   audio.currentTime = 0; // Rewind to start
//   audio.play();

//   key.classList.add("playing");
// }

// function removeTransition(e) {
//   if (e.propertyName !== "transform") return;
//   this.classList.remove("playing");
// }

// const keys = document.querySelectorAll(".key");
// keys.forEach((key) => {
//   key.addEventListener("transitionend", removeTransition);
//   key.addEventListener("click", playSound);
// });

// window.addEventListener("keydown", playSound);

// Initialize Web Audio API Context
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

// Sound Synthesizers
function playSynthSound(keyCode) {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();

  const now = audioCtx.currentTime;

  switch (keyCode) {
    case "65": // Clap / Noise
      playNoise(now, 0.2);
      break;
    case "83": // Hihat
      playTone(1000, "square", now, 0.05);
      break;
    case "68": // Kick
      playSweep(150, 0.01, now, 0.5);
      break;
    case "70": // Openhat
      playTone(800, "triangle", now, 0.3);
      break;
    case "71": // Boom
      playSweep(80, 0.01, now, 0.8);
      break;
    case "72": // Ride
      playTone(1200, "sine", now, 0.4);
      break;
    case "74": // Snare
      playSweep(250, 0.01, now, 0.15);
      playNoise(now, 0.15);
      break;
    case "75": // Tom
      playSweep(120, 0.01, now, 0.3);
      break;
    default:
      return false;
  }
  return true;
}

// Sound Helper Functions
function playTone(freq, type, time, duration) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.5, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(time);
  osc.stop(time + duration);
}

function playSweep(startFreq, endFreq, time, duration) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.frequency.setValueAtTime(startFreq, time);
  osc.frequency.exponentialRampToValueAtTime(endFreq, time + duration);
  gain.gain.setValueAtTime(1, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(time);
  osc.stop(time + duration);
}

function playNoise(time, duration) {
  const bufferSize = audioCtx.sampleRate * duration;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.3, time);
  gain.gain.exponentialRampToValueAtTime(0.01, time + duration);
  noise.connect(gain);
  gain.connect(audioCtx.destination);
  noise.start(time);
}

// Event Handlers
function handleInput(keyCode) {
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (!key) return;

  const played = playSynthSound(keyCode);
  if (played) {
    key.classList.add("playing");
  }
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");
keys.forEach((key) => {
  key.addEventListener("transitionend", removeTransition);
  key.addEventListener("click", (e) => {
    const code = e.currentTarget.getAttribute("data-key");
    handleInput(code);
  });
});

window.addEventListener("keydown", (e) => {
  handleInput(e.keyCode.toString());
});