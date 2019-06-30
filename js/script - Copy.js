var todoApp = (function () {
    
    /**
     * The DOM element that contains the new todo text.
     * @type {HTMLElement}
     * @private
     */
    const TODO_NEW = document.getElementById("new-todo");

    /**
     * The DOM element that contains todo list.
     * @type {HTMLElement}
     * @private
     */
    const TODO_LIST = document.querySelector(".todo-list");

    /**
     * The DOM element that clears all completed todos.
     * @type {HTMLElement}
     * @private
     */
    const CLEAR_COMPLETED = document.querySelector(".clear-completed");


    /**
     * Adds event listener to element using native event listener
     * @param {HTMLElement} element Target to attach listener to
     * @param {array} types Name of the action to listen for
     * @param {function} listener Function to be executed on action
     *
     * @returns {void}
     */

    function on(element, types, listener) {
        types.forEach(function(type) {
            element.addEventListener(type, function(event) {
                listener(event);
            });
        });
    }


    /**
     * Parses the specified text as HTML or XML and inserts
     * the resulting nodes into the DOM tree at a specified position
     * @param {HTMLElement} element Target to attach listener to
     * @param {position} DOMString Representing the position relative to the element
     * @param {text} string To be parsed as HTML or XML and inserted into the tree.
     *
     * @returns {void}
     */

    function insertHTML(element, position, text) {
        element.insertAdjacentHTML(position, text);
    }


    /**
     * Returns a static (not live) NodeList of all checkboxes.
     *
     * @returns {NodeList}
     */
   
    function allTodos() {
        var allTodosCollection = TODO_LIST.querySelectorAll('[type="checkbox"]');

        return allTodosCollection;
    }


    /**
     * Returns a static (not live) NodeList of checked checkboxes.
     *
     * @returns {NodeList}
     */
   
    function activeTodos() {
        var activeTodosCollection = TODO_LIST.querySelectorAll('[type="checkbox"]:not(:checked)');

        return activeTodosCollection;
    }


    /**
     * Returns a static (not live) NodeList of not checked checkboxes.
     *
     * @returns {NodeList}
     */

    function completedTodos() {
        var completedTodosCollection = TODO_LIST.querySelectorAll('input[type="checkbox"]:checked');

        return completedTodosCollection;
    }


    /**
     * Inserts new todo to the list.
     *
     * @returns {void}
     */

    function addTodo() {
        event.preventDefault();

        if (event.keyCode === 13 && event.target.nodeName === "INPUT") {
            var value = TODO_NEW.value;

            var todoHTML =  `<li class="todo">
                                <div class="view">
                                    <input class="toggle" type="checkbox">
                                    <label>${value}</label>
                                    <button class="destroy"></button>
                                </div>
                            </li>`;

            insertHTML(TODO_LIST, 'beforeend', todoHTML);

            // Reset the input.
            TODO_NEW.value = "";
        }
    }


    /**
     * Removes the closest .todo element.
     *
     * @returns {void}
     */

    function removeTodo() {
        if (event.target.className === "destroy") {
            var closestTodo = event.target.closest(".todo");
            closestTodo.remove();
        }
    }


    /**
     * Renders all counters.
     *
     * @returns {void}
     */

    function renderCounters() {
        if(["DOMContentLoaded"].indexOf(event.type) != -1 || event.keyCode === 13 || ["toggle", "destroy", "clear-completed"].indexOf(event.target.className) != -1) {
            document.getElementById("active-count").textContent = activeTodos().length;
            document.getElementById("completed-count").textContent = completedTodos().length;
        }
    }


    /**
     * Clears all completed todos.
     *
     * @returns {void}
     */

    function clearCompleted() {
        completedTodos().forEach(function(cur) {
            cur.closest(".todo").remove();
        });
    }


    /**
     * Filters the todos according the option.
     *
     * @returns {void}
     */

    function selectFilter() {
        if(event.keyCode === 13 || event.target.tagName === "A" || event.target.className === "toggle" || event.type === "DOMContentLoaded" ||event.type === "hashchange") {

            var filters = ["#/all", "#/active", "#/completed"];
            var option = window.location.hash === "" || window.location.hash === "#/" ? "#/all" : window.location.hash;
        
            if (filters.indexOf(option) != -1) {

                document.querySelector(".selected").className = "";

                document.getElementById(option.substr(2)).className = "selected";

                allTodos().forEach(function(cur) {
                    cur.closest(".todo").style.display = "flex";
                });

                if (option === "#/completed") {
                    activeTodos().forEach(function(cur) {
                        cur.closest(".todo").style.display = "none";
                    });
                }

                if (option === "#/active") {
                    completedTodos().forEach(function(cur) {
                        cur.closest(".todo").style.display = "none";
                    });
                }
            }
        }
    }


    /**
     * Updates selected todo.
     *
     * @returns {void}
     */

    function updateTodo() {
        if (event.type === "dblclick" && event.target.tagName === "LABEL") {

            var editElement = document.getElementById("edit");
            var viewElements = [...document.getElementsByClassName("view")];
            var targetElement = event.target;
            var editHTML = `<input class="edit" id="edit" type="textbox" value="${targetElement.textContent}"></input>`;

            if(editElement) editElement.remove();

            viewElements.forEach(function(cur) {
                cur.style.display = "flex";
            });

            targetElement.closest(".todo").insertAdjacentHTML('beforeend', editHTML);
            targetElement.closest(".view").style.display = "none";
    
        } else if (event.type === "click" && event.target !== document.getElementById("edit")) {
            var editElement = document.getElementById("edit");
            var viewElements = [...document.getElementsByClassName("view")];

            viewElements.forEach(function(cur) {
                cur.style.display = "flex";
            });
    
            if(editElement) editElement.remove();

        } else if (event.keyCode === 13 && event.target.className === "edit") {

            var editElement = document.getElementById("edit");
            var viewElements = [...document.getElementsByClassName("view")];

            event.target.closest(".todo").querySelector('.view > label').textContent = event.target.value;

            viewElements.forEach(function(cur) {
                cur.style.display = "flex";
            });

            if(editElement) editElement.remove();

        }
    }

    // Return an object exposed to the public
    return {
        // Initialize
        init: function() {
            on(TODO_NEW, ['keyup'], addTodo);
            on(TODO_LIST, ['click'], removeTodo);
            on(document, ['DOMContentLoaded', 'click', 'keyup'], renderCounters);
            on(CLEAR_COMPLETED, ['click'], clearCompleted);
            on(window, ['click', 'hashchange', 'DOMContentLoaded', "keyup"], selectFilter);
            on(document, ['click', 'dblclick', 'keyup'], updateTodo);
        }
    };
})();
var t0 = performance.now();
todoApp.init();
var t1 = performance.now();
console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");



/*
aa
document.getElementById("new-todo").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {

        // New Todo

        var myValue = document.getElementById("new-todo").value;
        //var todoList = document.getElementsByClassName('todo-list');
        //var firstTodoList = todoList[0];
        let newTodo =  `<li class="todo">
                            <div class="view">
                                <input class="toggle" type="checkbox">
                                <label>${myValue}</label>
                                <button class="destroy"></button>
                            </div>
                        </li>`;

        document.querySelector(".todo-list").insertAdjacentHTML('beforeend', newTodo);

        document.getElementById("new-todo").value = "";

        // Counter

        let numberOfTodos = document.querySelectorAll('.todo').length;
        let numberOfChecked = document.querySelectorAll('.todo-list input[type="checkbox"]:checked').length;
    
        document.querySelector("#counter strong").innerHTML = numberOfTodos - numberOfChecked;

    }
});



document.addEventListener("click", function(event) {


    // Target

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

    // Filters - Remove "selected" class

    for (let i = 0; i < selectedList.length; i++) {
        document.getElementsByClassName("selected")[i].className = "";
    }

    // Filter todos

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

    // Edit

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


        // Edit Completed

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



let button = document.querySelector("footer");
function once() {
  console.log(event.target.innerHTML);

  button.removeEventListener("click", once); // So, we can use this eventListener only once.
}
button.addEventListener("click", once);

*/