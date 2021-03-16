class Fetch {
    async getCurrent(input) {
        const myKey = "39a9a737b07b4b703e3d1cd1e231eedc";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${myKey}&units=metric`
        );

        const data = await response.json();

        console.log(data);

        return data;
    }
}

class UI {
    constructor() {
        this.uiContainer = document.getElementById("content");
        this.city;
        this.defaultCity = "London";
    }

    populateUI(data) {

        this.uiContainer.innerHTML = `
      
     
          <div class="output">
            <p>${data.name}</p>
            <p>Temperature is ${data.main.temp} degrees.</p>
            <p>Feels like ${data.main.feels_like} degrees.</p>
            <p>Description: ${data.weather[0].description}</p>      
          </div>
     
      
      
      `;
    }

    clearUI() {
        uiContainer.innerHTML = "";
    }

    saveToLS(data) {
        localStorage.setItem("city", JSON.stringify(data));
    }

    getFromLS() {
        if (localStorage.getItem("city" == null)) {
            return this.defaultCity;
        } else {
            this.city = JSON.parse(localStorage.getItem("city"));
        }

        return this.city;
    }

    clearLS() {
        localStorage.clear();
    }
}

const ft = new Fetch();
const ui = new UI();



const search = document.getElementById("searchUser");
const button = document.getElementById("submit");
button.addEventListener("click", () => {
    const currentVal = search.value;

    ft.getCurrent(currentVal).then((data) => {

        ui.populateUI(data);

        ui.saveToLS(data);
    });
});



window.addEventListener("DOMContentLoaded", () => {
    const dataSaved = ui.getFromLS();
    ui.populateUI(dataSaved);
});


const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";

}


function deleteCheck(e) {

    const item = e.target;

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");

        todo.addEventListener('transitionend', function() {
            todo.remove();
        });

    }

    if (item.classList[0] == "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}