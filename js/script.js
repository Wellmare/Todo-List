const addTaskInput = document.querySelector('.input-task')
const addTaskBtn = document.querySelector('.add-task-btn')

const countTodos = document.querySelector('#count-todo')
const countDoneTodos = document.querySelector('#count-done')

const mainTodos = document.querySelector('.main-todos')
const mainDoneTodos = document.querySelector('.main-done')


class Todo {
    constructor(text, completed = false, repeatData = false) {
        this.text = text
        this.parent = completed ? document.querySelector('.main-done') : document.querySelector('.main-todos')
        this.completed = completed

        this.create()
        this.checkboxList()
        this.closeBtnList()
        this.insert()

        if (repeatData) addDataToLocalstorage({text: this.text, completed: this.completed})
    }

    create() {
        const el = document.createElement('div')
        el.classList.add('todo')
        if (this.completed) {
            el.classList.add('done')
            el.innerHTML = `
            <div class="other-wrap">
                <div class="todo-checkbox">
                    <div class="checkbox-wrapper">
                        <input type="checkbox" checked="checked" class="checkbox">
                        <span class="checkbox-style"></span>
                    </div>
                </div>
                <div class="todo-text">${this.text}</div>
            </div>
            <div class="remove-wrap">
                <a href="" class="todo-remove">Remove</a>
            </div>
        `
        } else {
            el.innerHTML = `
            <div class="other-wrap">
                <div class="todo-checkbox">
                    <div class="checkbox-wrapper">
                        <input type="checkbox" class="checkbox">
                        <span class="checkbox-style"></span>
                    </div>
                </div>
                <div class="todo-text">${this.text}</div>
            </div>
            <div class="remove-wrap">
                <a href="" class="todo-remove">Remove</a>
            </div>
        `
        }

        this.el = el
    }

    checkboxList() {
        this.el.querySelector('.checkbox').addEventListener('click', () => {
            this.completed = !this.completed
            if (this.completed) {
                this.el.classList.add('switch')
                setTimeout(() => {
                    this.el.remove()

                    changeDataFromLocalstorage(this.text, 'completed', this.completed)

                    new Todo(this.text, true)
                    renderCountTodos()
                }, 500)

            } else {
                this.el.classList.add('switch')
                setTimeout(() => {
                    this.el.remove()

                    changeDataFromLocalstorage(this.text, 'completed', this.completed)

                    new Todo(this.text, false)
                    renderCountTodos()
                }, 500)

            }
        })
    }

    closeBtnList() {
        this.el.querySelector('.todo-remove').addEventListener('click', (e) => {
            e.preventDefault()
            this.el.classList.add('delete')
            setTimeout(() => {
                this.el.remove()
                removeDataFromLocalstorage(this.text)
                renderCountTodos()
            }, 500)

        })

    }

    insert() {
        this.parent.append(this.el)
        renderCountTodos()
        // if (document.querySelectorAll('.todo').length) {
        //     document.querySelector('.todo-empty').classList.add('hide')
        // }
    }

}

addTaskBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (addTaskInput.value.trim()) {
        new Todo(addTaskInput.value.trim(), false, true)
        addTaskInput.value = ''
    } else {
        alert('Нельзя добавить пустую задачу')
    }
})

function renderCountTodos() {
    countTodos.textContent = mainTodos.querySelectorAll('.todo').length
    countDoneTodos.textContent = mainDoneTodos.querySelectorAll('.todo').length
}

// -------------------------------

renderCountTodos()
getValuesLocalstorage()

if (!localStorage.getItem('visited')) localStorage.setItem('visited', true)

// ----------------------------------- \\

function getValuesLocalstorage() {
    const data = localStorage.getItem('Todos') ? JSON.parse(localStorage.getItem('Todos')) : []
    if (data.length === 0 && !localStorage.getItem('visited')) {
        new Todo('Add a new Todo!', false, true)
    }
    data.forEach(todo => {
        new Todo(todo.text, todo.completed)
    })

}

function addDataToLocalstorage(item) {
    const data = localStorage.getItem('Todos') ? JSON.parse(localStorage.getItem('Todos')) : []
    data.push(item)
    localStorage.setItem('Todos', JSON.stringify(data))
}

function removeDataFromLocalstorage(text) {
    const data = localStorage.getItem('Todos') ? JSON.parse(localStorage.getItem('Todos')) : []
    let newData = []
    if (data !== []) {
        data.forEach(todo => {
            if (todo.text !== text) {
                newData.push(todo)
            }
        })
    }

    localStorage.setItem('Todos', newData.length === 0 ? [] : JSON.stringify(newData))
}

function changeDataFromLocalstorage(textEl, changeablePart, newPart) {
    const data = localStorage.getItem('Todos') ? JSON.parse(localStorage.getItem('Todos')) : []
    const newData = []
    data.forEach(todo => {
        if (todo.text === textEl) {
            todo[changeablePart] = newPart
        }
        newData.push(todo)
    })
    localStorage.setItem('Todos', JSON.stringify(newData))
}