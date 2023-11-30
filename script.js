let todos = []
const output = document.querySelector("#output")
const form = document.querySelector("#Form")
const btn = document.querySelector("#btn")

const todoList = document.createElement("ul")
    todoList.classList = "todo-list"
 



const URL = "https://js1-todo-api.vercel.app/api/todos?apikey=5abc1221-24b3-4114-9b30-71f58cc4d338"

const gettodolist = async () => {
    try {
        const res = await fetch(URL)
        if (res.status !== 200) {
            throw new Error('Something went wrong')
        }
        const data = await res.json()
        console.log(data)

        
        todos = data
        /*data.forEach(todo => todos.push(todo))*/
        
        rendertodos()
        
       
         
    } catch (error) {
        console.log(error.message)
    }
}

gettodolist()


function rendertodos() {
  todoList.innerHTML = ""
  todos.forEach(todo => {
    const listItem = document.createElement("li");
    listItem.classList = "item-list";
    listItem.insertAdjacentHTML("beforeend", `
      ${todo.title}
      <button class="btn-delete" id="${todo._id}"><i class="fa-solid fa-trash"></i></button>
    `);

    todoList.appendChild(listItem);

    const btnDelete = listItem.querySelector(".btn-delete");
    btnDelete.addEventListener("click", async (e) => {
      const todoId = e.currentTarget.getAttribute("id");
      try {
        const res = await fetch(`https://js1-todo-api.vercel.app/api/todos/${todoId}?apikey=5abc1221-24b3-4114-9b30-71f58cc4d338`, {
          method: 'DELETE'
        });

        if (res.status !== 200) {
          throw new Error('Something went wrong');
        }

      
        listItem.remove();


        todos = todos.filter(todoItem => todoItem._id !== todoId);
      } catch (error) {
        console.log(error.message);
      }
    })
  })

  output.appendChild(todoList);
}



btn.addEventListener("click", async (e) => {
    e.preventDefault()
    try {
      const errorMessage = document.querySelector("#errorMessage")
      const input = document.querySelector("#newTaskInput")
  
      if (input.value.trim() === "") {
        errorMessage.textContent = "Please enter a valid todo text."
        return;
      }
  
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: input.value,
        }),
      })
  
      if (res.status !== 201) {
        throw new Error('Something went wrong')
      }
      const addtodo = await res.json()
      
      
      todos.push(addtodo)
      errorMessage.textContent = ""
      
      rendertodos()
      
      console.log(addtodo)
      
      input.value = ""
      
    } catch (error) {
      console.log(error.message)
    }
  })

