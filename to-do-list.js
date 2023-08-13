const deleteButton = document.querySelector('.delete-button')
const selectButton = document.querySelector('.select-button')
const button = document.querySelector('.send')
const input = document.querySelector('.main-input')
const container = document.querySelector('.doto-list-container')

const todoListState = {
    // Данные
    currentValue: "",
    todoList: [],

    // Слушатели событий
    createTodo() {
        if (todoListState.currentValue === "") return;
    
        todoListState.todoList.push({value: todoListState.currentValue, checked: false, id: new Date().getTime()});
        container.insertAdjacentHTML('beforeend', todoListState.getTodoItemHtml(false, new Date().getTime(), todoListState.currentValue));

        todoListState.currentValue = ""
        input.value = "";
        todoListState.saveStringify()
    },

    saveInput(event) {
        todoListState.currentValue = event.target.value
    },

    toggleTodo(event) {
    	const todoId = event.target.getAttribute("data-id")
        if (todoId) {
            let checked = event.target.getAttribute("data-checked")
            let image = event.target.querySelector("img")
            const foundItem = todoListState.todoList.find(function (item) {
                return item.id === +todoId
            })
            if (checked === "false") {
                event.target.setAttribute("data-checked", "true")
                image.src = "Circle-full.svg"
                foundItem.checked = true
            }
            if (checked === "true") {
                event.target.setAttribute("data-checked", "false")
                image.src = "Circle-empty.svg"
                foundItem.checked = false
            }
        }
        todoListState.saveStringify()
    },

    deleteAllTodo(){
     todoListState.todoList.splice(0, todoListState.todoList.length);
        container.innerHTML = ""
        todoListState.saveStringify()
    },

    selectAllTodo(){
        let nodeList = container.querySelectorAll(".todo-item")
            for (let i = 0; i < nodeList.length; i++) {
                let img = nodeList[i].querySelector("img")
                nodeList[i].setAttribute("data-checked", "true")
                img.src = "Circle-full.svg"
            }
            todoListState.todoList.forEach(todoItem => {
                todoItem.checked = true
            })
            todoListState.saveStringify()
    },

    //функции
    getTodoItemHtml(checked, id, value) {
        return `<div data-checked="${checked}" data-id="${id}"class ="todo-item">
                <button class="circle">
                    <img src="${checked === true ? "Circle-full.svg" : "circle-empty.svg"}">
                </button>
                ${value} 
                </div>
       `
    },

    //инициализация
    restoreData() {
        const storageTodos = JSON.parse(localStorage.getItem('doto-list'))
        if (storageTodos) {
            todoListState.todoList = storageTodos
        }
    },

    restoreView() {
        todoListState.todoList.forEach(todoItem => {
            container.insertAdjacentHTML('beforeend', todoListState.getTodoItemHtml(todoItem.checked, todoItem.id, todoItem.value))
        })
    },

    saveStringify(){
        localStorage.setItem('doto-list', JSON.stringify(todoListState.todoList))
    },


    initListeners() {
        button.addEventListener('click', todoListState.createTodo);
        input.addEventListener('input', todoListState.saveInput);
        container.addEventListener('click', todoListState.toggleTodo)
        deleteButton.addEventListener('click', todoListState.deleteAllTodo)
        selectButton.addEventListener('click', todoListState.selectAllTodo)
    },

    init() {
        todoListState.restoreData()
        todoListState.restoreView()
        todoListState.initListeners()
    }
}

todoListState.init()




