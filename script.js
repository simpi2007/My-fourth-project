const titleInput = document.getElementById("titleInput");
const descInput = document.getElementById("descInput");
const addBtn = document.getElementById("addBtn");
const noteList = document.getElementById("noteList");

addBtn.addEventListener("click", addNote);

window.onload = loadNotes;

function addNote() {
  const title = titleInput.value.trim();
  const desc = descInput.value.trim();

  if (title === "" || desc === "") return;

  const notes = getNotes();
  notes.push({ title, desc });

  localStorage.setItem("notes", JSON.stringify(notes));

  titleInput.value = "";
  descInput.value = "";

  loadNotes();
}

function loadNotes() {
  noteList.innerHTML = "";
  const notes = getNotes();

  notes.forEach((note, index) => {
    const div = document.createElement("div");
    div.classList.add("note");

    div.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.desc}</p>
      <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
    `;

    noteList.appendChild(div);
  });
}

function deleteNote(index) {
  const notes = getNotes();
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  loadNotes();
}

function getNotes() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}