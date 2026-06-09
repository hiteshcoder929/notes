let title = document.querySelector(".title-box");
let addButton = document.querySelector(".add-btn");
let main = document.querySelector("main");
let heading = document.querySelector("h1");
let notePage = document.querySelector(".note-page");
let search = document.querySelector(".search-box");
let searchButton = document.querySelector(".search-btn");
let home = document.querySelector(".home");
let clearAll = document.querySelector(".clear-all")
let restore = document.querySelector(".restore")

restore.addEventListener('click', () => {
  console.log(data)
  data = backupData
  localSave(data)
  render(data)
})

clearAll.addEventListener('click', () => {
  data = []
  localStorage.removeItem('dataSave')
  render(data)
  localSave(data)
})

let currentId = null;


title.focus();

heading.addEventListener("click", () => {
  localStorage.removeItem("dataSave");
});

// forming data sturcture
let backupData = JSON.parse(localStorage.getItem("dataSave")) || [];
let data = JSON.parse(localStorage.getItem("dataSave")) || [];

// saving data in local storage
function localSave(sav) {
  localStorage.setItem("dataSave", JSON.stringify(sav));
}

let colorsArray = [
  "#ffea0028", // soft yellow
  "#f3c40641",

  "#3d91ff2f", // soft blue
  "#0071fc31",

  "#53ff8f2d", // soft green
  "#00fc583b",

  "#fd54b45b", // soft pink
  "#ff00902c",

  "#896eff3a", // soft purple
  "#4117ff5e",

  "#83c1ff60", // soft gray (clean)
  "#69aaff5d",

  "#dcff1959", // soft orange
  "#ffa64063"
]

addButton.addEventListener("click", (e) => {
  if (title.value !== "") {
    e.preventDefault();
    data.push({
      id: Date.now(),
      title: title.value,
      date: new Date().toLocaleDateString(),
      pinned: false,
      content: "",
      color: "rgba(255, 255, 255, 0.08) "
    });
    render(data);
    localSave(data);
    backupData = data
    console.log(backupData)
    localSave(backupData)
    title.value = "";
  }
});

function render(str) {
  main.innerHTML = str
    .map(
      (obj, i) => `
    <div class="notes-box" data-id="${obj.id}" style = "background: ${obj.color}">
        <div class="box">
          <div class="date">${obj.date}</div>       
             <div class = "unpin" data-id="${obj.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pin-off-icon lucide-pin-off ${obj.pinned ? "" : "hidden"}"><path d="M12 17v5"/><path d="M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89"/><path d="m2 2 20 20"/><path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11"/></svg>
        </div>     
               </div>
        <div class="notes-title">
          <div class="title" data-id="${i}">${obj.title}</div>
          <div class="option-icon">
            <svg xmlns="http:/ /www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </div>
        </div>
        <div class="menu hidden">
          <div class="trash">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-trash2-icon lucide-trash-2">
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </div>
          <div class="pin" data-id="${obj.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-pin-icon lucide-pin">
              <path d="M12 17v5" />
              <path
                d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
            </svg>
          </div>
          <div class="edit" data-id="${i}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-pencil-icon lucide-pencil">
              <path
                d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
              <path d="m15 5 4 4" />
            </svg>
          </div>
          <div class="color" data-id="${obj.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-palette-icon lucide-palette">
              <path
                d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
              <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
              <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
              <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
              <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
  </div>`,   
    )
    .join("");

}

main.addEventListener("click", (e) => {
  let mainBox = e.target.closest(".notes-box");
  let settings = e.target.closest(".option-icon");
  let delButton = e.target.closest(".trash");
  let pin = e.target.closest(".pin");
  let unpin = e.target.closest(".unpin");
  let edit = e.target.closest(".edit");
  let paint = e.target.closest(".color");
  let title = e.target.closest(".title");
  let home = e.target.closest(".home");

  document.querySelectorAll(".menu").forEach((a) => {
    a.classList.add("hidden");
  });

  if (settings) {
    let box = settings.closest(".notes-box");
    let menu = box.querySelector(".menu");
    menu.classList.remove("hidden");
  } else if (delButton) {
    deleteFuntion(mainBox)
  } else if (pin) {
    let index = pin.dataset.id;

    let note = data.find((t) => t.id == index);
    note.pinned = !note.pinned

    render(data);
    localSave(data);
    localSave(backupData)
  } else if (unpin) {
    let index = unpin.dataset.id;

    let note = data.find((t) => t.id == index);
    note.pinned = !note.pinned

    render(data);
    localSave(data);
  } else if (edit) {
    let box = edit.closest(".notes-box");
    let input = box.querySelector(".title");
    let index = input.dataset.id;
    input.innerHTML = `<input type="text" class="new-input" value="${input.innerText}" name="input">`;

    let newInput = box.querySelector(".new-input");
    newInput.focus();
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        data[index].title = newInput.value;
        render(data);
        localSave(data);
        localSave(backupData)
      }
    });
  } else if (paint) {
    colorFunction(paint)
  } else if (
    mainBox &&
    !settings &&
    !pin &&
    !unpin &&
    !paint &&
    !edit &&
    !delButton
  ) {
    let id = mainBox.dataset.id;
    openPage(id);
    currentId = id
  }
});

function colorFunction(paint) {
  let id = paint.dataset.id
  let col = data.find((t) => t.id == id)

  let num = Math.floor(Math.random() * colorsArray.length)
  col.color = colorsArray[num]
  render(data)
  localSave(data)
  localSave(backupData)
}

function deleteFuntion(mainBox) {
  localSave(backupData)
  console.log(backupData)
  let id = mainBox.dataset.id;
  let index = data.findIndex((t) => t.id == id);
  data.splice(index, 1)
  render(data);
  localSave(data);
}

searchButton.addEventListener("click", (e) => {
  searchFun(e);
});

function searchFun(e) {
  e.preventDefault();
  let searchTitle = search.value.toLowerCase();
  let searchData = data.filter((t) =>
    t.title.toLowerCase().includes(searchTitle),
  );

  render(searchData);
  search.value = "";
}

home.addEventListener("click", (e) => {
  if (
    search.value !== "" &&
    !e.target.closest(".search-btn") &&
    !e.target.closest(".search-box")
  ) {
    console.log("hiteshsd");
    render(data);
  }
});

render(data);

let page2 = document.querySelector(".page-2");
let noteTitle = document.querySelector(".notes-title span");
let noteContent = document.querySelector("#notes");
let noteDate = document.querySelector(".date span");
let homeBtn = document.querySelector(".home-btn");
let pinNotes = document.querySelector(".pin-notes")
let delButton = document.querySelector(".del")
let colorNote = document.querySelector(".color-note")

function homeFun() {
  home.classList.remove("hidden");
  page2.classList.add("hidden");
}

homeBtn.addEventListener("click", () => {
  homeFun()
});

function openPage(id) {
  let note = data.find((n) => n.id == id);

  saveContent(note);

  home.classList.add("hidden");
  page2.classList.remove("hidden");

  noteTitle.innerText = note.title;
  noteDate.innerText = note.date;
  noteContent.value = note.content || "";

  setTimeout(() => {
    noteContent.focus();
  }, 100)
}

function saveContent(note) {
  noteContent.addEventListener("input", () => {
    if (noteContent.value != "") {
      note.content = noteContent.value;
      render(data);
      localSave(data);
      localSave(backupData)
    }
  });
}


pinNotes.addEventListener('click', () => {
  let note = data.find(n => n.id == currentId)

  note.pinned = !note.pinned   // 🔥 toggle

  render(data)
  localSave(data)
  localSave(backupData)
})

delButton.addEventListener('click', () => {
  let index = data.findIndex((t) => t.id == currentId)
  data.splice(index, 1)
  render(data)
  localSave(data)
  localSave(backupData)
  homeFun()
})