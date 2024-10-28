const addButton = document.querySelector("#add")

//estado da aplicação
const tasks = ["Estudar CSS", "Estudar JS", "Estudar HTML"]

//alterando estado da aplicação
function add() {
  const input = document.querySelector("#task")
  const newtask = input.value
  input.value = ''
  tasks.push(newtask)
  console.log(tasks)
  render()
}

//mostrando resultado na tela
function render() {
  const list = document.querySelector("#list")
  list.innerHTML = null
  tasks.forEach(task => {
    
    const li = document.createElement("li")
    li.innerHTML = task
    list.appendChild(li)
  })

}

render()

addButton.onclick = add