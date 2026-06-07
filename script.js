let title = document.querySelector(".title-box");
let addButton = document.querySelector(".add-btn");
let main = document.querySelector("main");

// forming data sturcture
let data = JSON.parse(localStorage.getItem("dataSave")) || [];

// saving data in local storage
function localSave(sav) {
    localStorage.setItem("dataSave", JSON.stringify(sav));
}

addButton.addEventListener("click", (e) => {
    if (title.value !== "") {
        e.preventDefault();
        data.push({
            id: Date.now(),
            title: title.value,
            date: new Date().toLocaleDateString(),
            pined: false,
        });
        render(data);
        localSave(data)
        title.value = "";
    }
});

function render(str) {
    main.innerHTML = str.map((obj,i) => `
    <div class="notes-box" data-id="${obj.id}">
        <div class="box">
          <div class="date">${obj.date}</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pin-off-icon lucide-pin-off hidden"><path d="M12 17v5"/><path d="M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89"/><path d="m2 2 20 20"/><path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11"/></svg>
        </div>
        <div class="notes-title">
          <div class="title" data-id="${i}">${obj.title}</div>
          <div class="option-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
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
          <div class="pin">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-pin-icon lucide-pin">
              <path d="M12 17v5" />
              <path
                d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
            </svg>
          </div>
          <div class="edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-pencil-icon lucide-pencil">
              <path
                d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
              <path d="m15 5 4 4" />
            </svg>
          </div>
          <div class="color">
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
  </div>`
    ).join("");
}

main.addEventListener('click', (e) => {
    let mainBox = e.target.closest(".notes-box")
    let settings = e.target.closest(".option-icon")
    let delButton = e.target.closest(".trash")
    let pin = e.target.closest(".pin")
    let unpin = e.target.closest(".lucide-pin-off")
    let edit = e.target.closest(".edit")

    if (settings) {
        let box = settings.closest(".notes-box")
        let menu = box.querySelector(".menu")
        menu.classList.toggle("hidden")
        e.target.closest("main").addEventListener('click', () => {
            menu.classList.add("hidden")
        })
    } else if (delButton) {
        let index = mainBox.dataset.id
        let delData = data.filter((t) => !(index == t.id))
        render(delData)
        localSave(delData)
    } else if (pin) {
        let box = pin.closest(".notes-box")
        let newunpin = box.querySelector(".lucide-pin-off")
        newunpin.classList.remove("hidden")
    } else if (unpin) {
        unpin.classList.add("hidden")
    }else if (edit){
        let box = edit.closest(".notes-box")
        let input = box.querySelector(".title")
        let index2 = input.dataset.id
        input.innerHTML = `<input type="text" class="new-input" value="${input.innerText}" name="input">`

        let newInput = box.querySelector(".new-input")
        newInput.focus()
        input.addEventListener('keydown', (e) => {
            if(e.key === "Enter"){
                data[index2].title === newInput.value
                render(data)
                localSave(data)
            }
        })
    }
})

render(data)
