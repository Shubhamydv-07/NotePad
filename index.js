const textArea = document.getElementById("text-area");
const countDisplay = document.getElementById("count");
const notesContainer = document.getElementById("notes-container");
let history = [], redoStack = [];

textArea.addEventListener("input", cnt);
function cnt(){
  history.push(textArea.value);
  let count = (textArea.value.match(/[a-zA-Z]/g) || []).length;
  countDisplay.innerText = `Letters Count: ${count}`;
}

function addNote() {
  const value = textArea.value.trim();
  if (!value) return;
  const note = document.createElement("div");
  note.className = "note";
  note.innerHTML = `
    <div contenteditable="true">${value}</div>
    <div class="note-controls">
      <small>${new Date().toLocaleString()}</small>
      <div>
        <span style="background: hotpink" onclick="changeColor(this, 'hotpink')"> </span>
        <span style="background: lightblue" onclick="changeColor(this, 'lightblue')"> </span>
        <span style="background: yellow" onclick="changeColor(this, 'yellow')"> </span>
        <span style="background: lightgreen" onclick="changeColor(this, 'lightgreen')"> </span>
        <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" onclick="deleteNote(this)">
      </div>
    </div>
  `;
  notesContainer.prepend(note);
  textArea.value = "";
  countDisplay.innerText = `Letters Count: 0`;
}

function clearNote() {
  textArea.value = "";
  countDisplay.innerText = `Letters Count: 0`;
}

function undoNote() {
  if (history.length > 0) {
    redoStack.push(textArea.value);
    textArea.value = history.pop() || "";
  }
}

function redoNote() {
  if (redoStack.length > 0) {
    history.push(textArea.value);
    textArea.value = redoStack.pop();
  }
}

function selectAllText() {
  textArea.select();
}

async function pasteClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    textArea.value += text;
  } catch (err) {
    alert("Clipboard access denied.");
  }
  count();
}

function changeColor(el, color) {
  const note = el.closest(".note");
  note.style.backgroundColor = color;
}

function deleteNote(el) {
  const note = el.closest(".note");
  notesContainer.removeChild(note);
}

function setMode(mode) {
  if (mode === 'dark') {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}
