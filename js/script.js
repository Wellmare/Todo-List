const addTaskInput = document.querySelector('.input-task')
const addTaskBtn = document.querySelector('.add-task-btn')

const countTodos = document.querySelector('#count-todo')
const countDoneTodos = document.querySelector('#count-done')

const mainTodos = document.querySelector('.main-todos')
const mainDoneTodos = document.querySelector('.main-done')


renderCountTodos()


class Todo {
    constructor(text, completed = false) {
        this.text = text
        this.parent = completed ? document.querySelector('.main-done') : document.querySelector('.main-todos')
        this.completed = completed

        this.create()
        this.checkboxList()
        this.closeBtnList()
        this.insert()
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
        // const dataArr = [this.completed, this.text]
        // const newArr = Object.values()//.push([true, 'adsad'])
        // console.log(newArr)
        // console.log(JSON.parse(localStorage.getItem('Todos')))
        // const newArr = localStorage.getItem('Todos') ? JSON.parse(localStorage.getItem('Todos')).append(dataArr) : [dataArr]

        // localStorage.setItem('Todos', JSON.stringify(newArr))
    }

    checkboxList() {
        this.el.querySelector('.checkbox').addEventListener('click', () => {
            this.completed = !this.completed
            if (this.completed) {
                this.el.classList.add('switch')
                setTimeout(() => {
                    this.el.remove()
                    new Todo(this.text, true)
                    renderCountTodos()
                }, 500)

            } else {
                this.el.classList.add('switch')
                setTimeout(() => {
                    this.el.remove()
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
        new Todo(addTaskInput.value.trim())
        addTaskInput.value = ''
    } else {
        alert('Нельзя добавить пустую задачу')
    }
})
function renderCountTodos() {
    countTodos.textContent = mainTodos.querySelectorAll('.todo').length
    countDoneTodos.textContent = mainDoneTodos.querySelectorAll('.todo').length
}
