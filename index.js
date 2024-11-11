// variaveis
let editButtons = document.querySelectorAll(".edit")
let removeButtons = document.querySelectorAll(".remove")
let markTasks = document.querySelector(".markTasks")
const addButton = document.querySelector("#buttonAdd")

let tasks = JSON.parse(localStorage.getItem('tasks')) || []

render()
editButtonAction()
removeButtonAction()
markButtonAction()

// Adicionando nova tarefa
addButton.addEventListener('click', (e) => {
  
  e.preventDefault()
  add()
  editButtonAction()
  removeButtonAction()
  markButtonAction()
})

// Atualizar local storage
function updateLocalStorage(){
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//alterando estado da aplicação
function add() {

  const taskTitle = document.querySelector("#taskTitle")
  const newTitle = taskTitle.value
  taskTitle.value = ''

  const taskDate = document.querySelector("#taskDate")
  const newDate = taskDate.value
  taskDate.value = ''

  const taskTime = document.querySelector("#taskTime")
  const newTime = taskTime.value
  taskTitle.value = ''

  const newTask = {
    taskDescription: `${newTitle}, dia: ${newDate} às ${newTime}`,
    taskIsDone: false
  }
  tasks.push(newTask)
  updateLocalStorage()
  render()
}

// Removendo tarefa(li)
function remove() {
  const editOrRemove = this.parentElement
  const li = editOrRemove.parentElement
  li.remove()
  tasks.splice(li.id, 1)
  updateLocalStorage()
}

// Editando tarefa 
function edit() {
  const editOrRemove = this.parentElement
  const li = editOrRemove.parentElement
  const taskDescription = li.children[1]
  taskDescription.readOnly = false
  taskDescription.focus()

  taskDescription.addEventListener('keydown', (e) => {
    if(e.key === "Enter") {
      taskDescription.blur()
      if(document.activeElement !== taskDescription){
        tasks[li.id].taskDescription = taskDescription.value
  
        updateLocalStorage()
        taskDescription.readOnly = true
      }   
    } else {
      taskDescription.focus()
    }
  })
}

// Aplicando background na tarefa marcada
function checkTask() {
  const li = this.parentElement
  const taskDescription = li.children[1]
  
  if(this.checked ){
    taskDescription.classList.add("taskCompleted") 
    tasks[li.id].taskIsDone = true
  } else {
    taskDescription.classList.remove("taskCompleted")
    tasks[li.id].taskIsDone = false
  }
  
  updateLocalStorage()
}

  //mostrando resultado na tela
  function render() {
    const list = document.querySelector("#list")
    list.innerHTML = null
    tasks.forEach(task => {
      createElements(task)
    })
  }
  
  // Criando tarefa
  function createElements(task){

    const list = document.querySelector("#list")
    const li = document.createElement("li")
    li.id = list.childElementCount
    
    const inputCheck = document.createElement("input")
    inputCheck.type = "checkbox"
    inputCheck.id = "checkbox"
    inputCheck.className = "markTasks"
    
    const inputEdit = document.createElement("input")
    inputEdit.type = "text"
    inputEdit.id = "taskDescription"
    inputEdit.readOnly = true

    if(task.taskIsDone) {
      inputEdit.classList = "taskCompleted" 
      inputCheck.checked = true
    } 

    const buttonEdit = document.createElement("button")
    buttonEdit.className = "edit"
    buttonEdit.id = "edit"

    const buttonRemove = document.createElement("button")
    buttonRemove.className = "remove"
    buttonRemove.id = "remove"
    
    const editOrRemove = document.createElement("div")
    editOrRemove.id = "editOrRemove"

    inputEdit.value = task.taskDescription

    editOrRemove.appendChild(buttonEdit)
    editOrRemove.appendChild(buttonRemove)
    
    li.appendChild(inputCheck)
    li.appendChild(inputEdit)
    li.appendChild(editOrRemove)

    list.appendChild(li)
}

// Ação do botão de editar
function editButtonAction() {
  editButtons = document.querySelectorAll(".edit")  
  editButtons.forEach(editButton => {
    editButton.addEventListener('click', edit)
  })
}

// Ação do botão de excluir
function removeButtonAction() {
  removeButtons = document.querySelectorAll(".remove")
  removeButtons.forEach(removeButton => {
    removeButton.addEventListener('click', remove)
  })
}

// Ação do botão de marcarr
function markButtonAction() {
  markTasks = document.querySelectorAll(".markTasks")
  markTasks.forEach(markTask => {
    markTask.addEventListener('click', checkTask)
  })
}