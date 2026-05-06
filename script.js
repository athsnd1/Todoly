const textBox = document.querySelector(".text-area");
const addBtn = document.querySelector(".add-btn");
const taskArea = document.querySelector(".task-area");
const infoArea = document.querySelector(".info-area");

const deleteSound = new Audio('audio/universfield-computer-mouse-click-02-383961.mp3');
const crossSound = new Audio('audio/47313572-ui-sounds-pack-4-2-359741.mp3');
const addSound = new Audio('audio/new_click_sound.mp3');
const keySound = new Audio('audio/denielcz-immersivecontrol-button-click-sound-463065.mp3');

function addTask(){
    infoArea.textContent = "";

        const emptyBox = document.createElement("img");
        emptyBox.src = "images/checkbox-empty-svgrepo-com (1).png";
        emptyBox.width = 20;
        emptyBox.height =20;
        emptyBox.id = "empty-box";
        
        const text = document.createElement("p");
        text.textContent = textBox.value;
        text.classList.add("text-width");

        const cross = document.createElement("img");
        cross.src = "images/cross-svgrepo-com.png";
        cross.height = 20;
        cross.width = 20;
        cross.id = "cross";

        const div = document.createElement("div");
        div.appendChild(emptyBox);
        div.appendChild(text);
        div.appendChild(cross);

        taskArea.appendChild(div);
        div.classList.add("flex-display");

        infoArea.textContent = "";

        textBox.value = "";
        saveData();
}

addBtn.addEventListener("click", e => {
    addSound.play();
    if(!textBox.value.trim()){
        infoArea.textContent = "";
        setTimeout(() => {
            infoArea.textContent = "No task to add! :(";
        }, 0);
        return;
    }else{
        addTask();
        saveData();
    }
})

textBox.addEventListener("keydown",e => {
    keySound.play();
    if(e.key === "Enter"){
        addSound.play();
        e.preventDefault();
        addTask();
    }
})

textBox.addEventListener("input", () => {
    infoArea.textContent = "";
});

textBox.addEventListener("focus",e => {
    infoArea.textContent = "";
})

taskArea.addEventListener("dblclick", e => {
    if(e.target.tagName === "P"){
        e.target.contentEditable = true;
        e.target.focus();
    }
})

taskArea.addEventListener("focusout", e => {
    if(e.target.tagName === "P"){
        e.target.contentEditable = false;
        if(e.target.textContent.trim() === ""){
            deleteSound.play();
            taskArea.removeChild(e.target.parentNode);
            saveData();
        }
    }
})

taskArea.addEventListener("keydown", e =>{
    if(e.key === "Enter"){
        e.preventDefault();
        if(e.target.tagName === "P"){
            e.target.contentEditable = false;
            deleteSound.play();
            if(e.target.textContent.trim() === ""){
                taskArea.removeChild(e.target.parentNode);
                saveData();
            }
        }
    }
})

taskArea.addEventListener("click", e => {
    if (e.target.tagName === "IMG") {
        if (e.target.id === "empty-box") {
            const taskText = e.target.parentNode.querySelector("p");

            if (taskText.classList.contains("completed")) {
                crossSound.play();
                taskText.classList.remove("completed");
                taskText.classList.add("still-working");

                e.target.src = "images/checkbox-empty-svgrepo-com (1).png";
                saveData();
            } else {
                crossSound.play();
                taskText.classList.add("completed");
                taskText.classList.remove("still-working");

                e.target.src = "images/checkbox-checked-svgrepo-com.png";
                saveData();
            }
        }

        if (e.target.id === "cross") {
            deleteSound.play();
            taskArea.removeChild(e.target.parentNode);
            saveData();
        }
    }
});

function saveData(){
    localStorage.setItem("data",taskArea.innerHTML);
}

function showData(){
    taskArea.innerHTML = localStorage.getItem("data");
}

document.addEventListener("DOMContentLoaded", showData);