const addBtn = document.getElementById("add");
const notesContainer = document.getElementById("notes-container");

const notes = JSON.parse(localStorage.getItem("notes")) || [];

if (notes.length > 0) {
  notes.forEach((note) => addNewNote(note));
} else {
  addNewNote();
}

addBtn.addEventListener("click", () => addNewNote());

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
    <div class="tools">
      <button class="delete">Delete</button>
    </div>
    <textarea placeholder="Write your note here...">${text}</textarea>
  `;

  const deleteBtn = note.querySelector(".delete");
  const textArea = note.querySelector("textarea");

  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateLS();
  });

  textArea.addEventListener("input", () => {
    updateLS();
  });

  notesContainer.appendChild(note);
  updateLS();
}

function updateLS() {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];

  notesText.forEach((note) => notes.push(note.value));

  localStorage.setItem("notes", JSON.stringify(notes));
}