function Car( model, year, miles ) {
 
  this.model = model;
  this.year = year;
  this.miles = miles;
 
}
 
 
// Note here that we are using Object.prototype.newMethod rather than
// Object.prototype so as to avoid redefining the prototype object
Car.prototype.toString = function () {
  return this.model + " has done " + this.miles + " miles";
};
 
// Usage:
 
var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );
 
//console.log( civic.toString() );
//console.log( mondeo.toString() );




document.getElementById("new-todo").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        var myValue = document.getElementById("new-todo").value;
        //var todoList = document.getElementsByClassName('todo-list');
        //var firstTodoList = todoList[0];
        let newTodo = `
            <li class="todo">
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label>${myValue}</label>
                    <button class="destroy"></button>
                </div>
            </li>
        `;

        document.querySelector(".todo-list").insertAdjacentHTML('beforeend', newTodo);

        document.getElementById("new-todo").value = "";

        // Counter
        let numberOfTodos = document.querySelectorAll('.todo').length;
        let numberOfChecked = document.querySelectorAll('.todo-list input[type="checkbox"]:checked').length;
    
        document.querySelector("#counter strong").innerHTML = numberOfTodos - numberOfChecked;

    }
});



document.addEventListener("click", function(event) {

    let targetElement = event.target;


    // Remove todo

    if (event.target.className === "destroy") {
        let closestTodo = targetElement.closest(".todo");
        closestTodo.remove();
    }


    // Counter

    let numberOfTodos = document.querySelectorAll('.todo').length;
    let numberOfChecked = document.querySelectorAll('.todo-list input[type="checkbox"]:checked').length;

    document.querySelector("#counter strong").innerHTML = numberOfTodos - numberOfChecked;

    //let targetElement = event.target;
    //let closestTodo = targetElement.closest(".todo");
    //closestTodo.classList.add("completed");

    // Cancel Edit
    if(targetElement.className !== "edit") {
        var editList = document.getElementsByClassName("edit");
        var viewList = document.getElementsByClassName("view");

        for(let i = 0; i < viewList.length; i++) {
            viewList[i].style.display = "flex";
        }

        for(let i = 0; i < editList.length; i++) {
            editList[i].remove();
        }
    }

    // Clear Completed

    if(targetElement.className === "clear-completed") {

        console.log(document.querySelectorAll('.todo-list input[type="checkbox"]:checked'));

        checkedLength = document.querySelectorAll('.todo-list input[type="checkbox"]:checked').length;

        
        for (let i = checkedLength - 1; i >= 0; i--) {

            document.querySelectorAll('.todo-list input[type="checkbox"]:checked')[i].closest(".todo").remove();
        }


    }

    // Counter of Clear Completed

    document.getElementById("completed-count").textContent = document.querySelectorAll('.todo-list input[type="checkbox"]:checked').length;



    // Filters

    let selectedList = document.getElementsByClassName("selected");
    let checkedList = document.querySelectorAll('.todo-list input[type="checkbox"]');

    for (let i = 0; i < selectedList.length; i++) {
        document.getElementsByClassName("selected")[i].className = "";
    }

    if (window.location.hash === "#/active") {
        document.getElementById("active").className = "selected";

        for (let i = 0; i < checkedList.length; i++) {
            document.querySelectorAll('.todo-list input[type="checkbox"]')[i].closest(".todo").style.display = "flex";
        }

        for (let i = 0; i < document.querySelectorAll('.todo-list input[type="checkbox"]:checked').length; i++) {
            document.querySelectorAll('.todo-list input[type="checkbox"]:checked')[i].closest(".todo").style.display = "none";
        }

    } else if (window.location.hash === "#/completed") {
        document.getElementById("completed").className = "selected";

        
        for (let i = 0; i < checkedList.length; i++) {
            document.querySelectorAll('.todo-list input[type="checkbox"]')[i].closest(".todo").style.display = "none";
        }

        for (let i = 0; i < document.querySelectorAll('.todo-list input[type="checkbox"]:checked').length; i++) {
            document.querySelectorAll('.todo-list input[type="checkbox"]:checked')[i].closest(".todo").style.display = "flex";
        }

    } else if (window.location.hash === "#/" || window.location.hash === "") {
        document.getElementById("all").className = "selected";

        for (let i = 0; i < checkedList.length; i++) {
            document.querySelectorAll('.todo-list input[type="checkbox"]')[i].closest(".todo").style.display = "flex";
        }
        
    }



});

window.addEventListener('hashchange', function(event){

    let selectedList = document.getElementsByClassName("selected");
    let checkedList = document.querySelectorAll('.todo-list input[type="checkbox"]');

    for (let i = 0; i < selectedList.length; i++) {
        document.getElementsByClassName("selected")[i].className = "";
    }

    if (window.location.hash === "#/active") {
        document.getElementById("active").className = "selected";

        for (let i = 0; i < checkedList.length; i++) {
            document.querySelectorAll('.todo-list input[type="checkbox"]')[i].closest(".todo").style.display = "flex";
        }

        for (let i = 0; i < document.querySelectorAll('.todo-list input[type="checkbox"]:checked').length; i++) {
            document.querySelectorAll('.todo-list input[type="checkbox"]:checked')[i].closest(".todo").style.display = "none";
        }

    } else if (window.location.hash === "#/completed") {
        document.getElementById("completed").className = "selected";

        
        for (let i = 0; i < checkedList.length; i++) {
            document.querySelectorAll('.todo-list input[type="checkbox"]')[i].closest(".todo").style.display = "none";
        }

        for (let i = 0; i < document.querySelectorAll('.todo-list input[type="checkbox"]:checked').length; i++) {
            document.querySelectorAll('.todo-list input[type="checkbox"]:checked')[i].closest(".todo").style.display = "flex";
        }

    } else if (window.location.hash === "#/" || window.location.hash === "") {
        document.getElementById("all").className = "selected";

        for (let i = 0; i < checkedList.length; i++) {
            document.querySelectorAll('.todo-list input[type="checkbox"]')[i].closest(".todo").style.display = "flex";
        }
        
    }

});

document.addEventListener("dblclick", function(event) {

    if(event.target.tagName === "LABEL") {

        var editList = document.getElementsByClassName("edit");
        var viewList = document.getElementsByClassName("view");

        for(let i = 0; i < viewList.length; i++) {
            viewList[i].style.display = "flex";
        }

        for(let i = 0; i < editList.length; i++) {
            editList[i].remove();
        }

        let todoText = event.target.textContent;

        let editHTML = `<input class="edit" id="edit" type="textbox" value="${todoText}"></input>`;

        let targetElement = event.target;
        let closestTodo = targetElement.closest(".todo");

        closestTodo.insertAdjacentHTML('beforeend', editHTML);


        let viewHTML = targetElement.closest(".view");
        viewHTML.style.display = "none";


    }

});

document.addEventListener("keyup", function(event) {
    event.preventDefault();

    if (event.keyCode === 13 && event.target.className === "edit") {


        // Edit
        let targetElement = event.target;
        let closestTodo = targetElement.closest(".todo");
        //let labelText = closestTodo.getElementsByClassName("view")[0].getElementsByTagName("label")[0].textContent;

        let editValue = targetElement.value;

        event.target.closest(".todo").getElementsByClassName("view")[0].getElementsByTagName("label")[0].textContent = editValue;


        var editList = document.getElementsByClassName("edit");
        var viewList = document.getElementsByClassName("view");

        for(let i = 0; i < viewList.length; i++) {
            viewList[i].style.display = "flex";
        }

        for(let i = 0; i < editList.length; i++) {
            editList[i].remove();
        }
    }
});

document.addEventListener("DOMContentLoaded", function(event) {
    // Counter
    let numberOfTodos = document.querySelectorAll('.todo').length;
    let numberOfChecked = document.querySelectorAll('input[type="checkbox"]:checked').length;

    document.querySelector("#counter strong").innerHTML = numberOfTodos - numberOfChecked;


    // Filters

    let selectedList = document.getElementsByClassName("selected");
    let checkedList = document.querySelectorAll('.todo-list input[type="checkbox"]');

    for (let i = 0; i < selectedList.length; i++) {
        document.getElementsByClassName("selected")[i].className = "";
    }

    if (window.location.hash === "#/active") {
        document.getElementById("active").className = "selected";

        for (let i = 0; i < checkedList.length; i++) {
            document.querySelectorAll('.todo-list input[type="checkbox"]')[i].closest(".todo").style.display = "flex";
        }

        for (let i = 0; i < document.querySelectorAll('.todo-list input[type="checkbox"]:checked').length; i++) {
            document.querySelectorAll('.todo-list input[type="checkbox"]:checked')[i].closest(".todo").style.display = "none";
        }

    } else if (window.location.hash === "#/completed") {
        document.getElementById("completed").className = "selected";

        
        for (let i = 0; i < checkedList.length; i++) {
            document.querySelectorAll('.todo-list input[type="checkbox"]')[i].closest(".todo").style.display = "none";
        }

        for (let i = 0; i < document.querySelectorAll('.todo-list input[type="checkbox"]:checked').length; i++) {
            document.querySelectorAll('.todo-list input[type="checkbox"]:checked')[i].closest(".todo").style.display = "flex";
        }

    } else if (window.location.hash === "#/" || window.location.hash === "") {
        document.getElementById("all").className = "selected";

        for (let i = 0; i < checkedList.length; i++) {
            document.querySelectorAll('.todo-list input[type="checkbox"]')[i].closest(".todo").style.display = "flex";
        }
        
    }


    
    // Counter of Clear Completed

    document.getElementById("completed-count").textContent = document.querySelectorAll('.todo-list input[type="checkbox"]:checked').length;


});