const paletteContainer = document.getElementById("palette");
const generateBtn = document.getElementById("generate-btn");

const PALETTE_SIZE = 5;

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updatePalette() {
  paletteContainer.innerHTML = "";

  for (let i = 0; i < PALETTE_SIZE; i++) {
    const color = generateRandomColor();
    const colorBox = document.createElement("div");
    colorBox.classList.add("color-box");
    colorBox.style.backgroundColor = color;
    colorBox.textContent = color;

    // Copy to clipboard on click
    colorBox.addEventListener("click", () => {
      navigator.clipboard.writeText(color);
      alert(`Copied ${color} to clipboard!`);
    });

    paletteContainer.appendChild(colorBox);
  }
}

generateBtn.addEventListener("click", updatePalette);

// Initial call on page load
updatePalette();