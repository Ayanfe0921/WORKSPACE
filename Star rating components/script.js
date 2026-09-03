const stars = document.querySelectorAll(".star");
const ratingText = document.getElementById("rating-text");

let selectedRating = 0;

const ratingLabels = {
  1: "Poor 😞",
  2: "Fair 😐",
  3: "Good 🙂",
  4: "Very Good 😊",
  5: "Excellent! 😄",
};

stars.forEach((star) => {
  star.addEventListener("mouseover", () => {
    const value = parseInt(star.dataset.value);
    highlightStars(value, "hovered");
  });

  star.addEventListener("mouseout", () => {
    clearHighlight("hovered");
  });

  star.addEventListener("click", () => {
    selectedRating = parseInt(star.dataset.value);
    highlightStars(selectedRating, "active");
    ratingText.textContent = `You rated: ${ratingLabels[selectedRating]}`;
  });
});

function highlightStars(count, className) {
  stars.forEach((star) => {
    const value = parseInt(star.dataset.value);
    if (value <= count) {
      star.classList.add(className);
    } else {
      star.classList.remove(className);
    }
  });
}

function clearHighlight(className) {
  stars.forEach((star) => star.classList.remove(className));
}