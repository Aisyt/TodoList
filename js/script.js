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
    
            // Silmek için .outerHTML = '' de kullanılabilir. Daha hızlıymış.
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
// console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
document.getElementById("performance").textContent =  `Page load time: ${(t1 - t0)} milliseconds.`;

