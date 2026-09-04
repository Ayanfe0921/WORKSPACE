const speech = new SpeechSynthesisUtterance();
const voiceSelect = document.querySelector("select");
const textarea = document.querySelector("textarea");
const listenBtn = document.getElementById("listen-btn");

let voices = [];

function populateVoices() {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];

  voiceSelect.innerHTML = "";
  voices.forEach((voice, i) => {
    const option = new Option(`${voice.name} (${voice.lang})`, i);
    voiceSelect.add(option);
  });
}

window.speechSynthesis.onvoiceschanged = populateVoices;

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

listenBtn.addEventListener("click", () => {
  if (textarea.value.trim() !== "") {
    speech.text = textarea.value;
    window.speechSynthesis.speak(speech);
  }
});