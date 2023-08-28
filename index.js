const msg = document.getElementById("txt");
const btn = document.getElementById("btn");
const box = document.getElementById("Todolist");

var Todo = {};
var todoId=1;

function loadTodos() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    Todo = JSON.parse(storedTodos);
  }
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(Todo));
}

function createTodoDiv(todoId, todoMsg, isChecked) {
  var todoDiv = document.createElement("div");
  todoDiv.className = "todo";

  var todoHeading = document.createElement("h2");
  todoHeading.textContent = todoMsg;

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isChecked;
  
  if (isChecked) {
    todoHeading.style.textDecoration = "line-through";
  } else {
    todoHeading.style.textDecoration = "none";
  }

  checkbox.addEventListener('change', () => {
    Todo[todoId].Checked = checkbox.checked;
    if (checkbox.checked) {
      todoHeading.style.textDecoration = "line-through";
    } else {
      todoHeading.style.textDecoration = "none";
    }
    saveTodos();
  });

  var deleteDiv = document.createElement("div");
  deleteDiv.className = "del";
  var deleteHeading = document.createElement("h2");
  deleteHeading.textContent = "X";
  deleteDiv.appendChild(deleteHeading);

  deleteDiv.addEventListener('click', () => {
    box.removeChild(todoDiv);
    delete Todo[todoId];
    saveTodos();
  });

  todoDiv.appendChild(todoHeading);
  todoDiv.appendChild(checkbox);
  todoDiv.appendChild(deleteDiv);
  box.appendChild(todoDiv);
}

function renderTodos() {
  box.innerHTML = ''; // Clear existing content
  var inc=0;
  for (const todoId in Todo) {
    var obj= Todo[todoId];
    if(obj.Checked==false){
    createTodoDiv(todoId,obj.Msg,false);
    }
    else{
      createTodoDiv(todoId,obj.Msg,true);
    }
    inc++;
  }
  todoId=inc;
  console.log(todoId);
}

btn.addEventListener('click', (event) => {
  event.preventDefault();
    todoId++;
  const todoMsg = msg.value;
  if (todoMsg) {
    createTodoDiv(todoId, todoMsg, false);
    Todo[todoId] = {
      Msg: todoMsg,
      Checked: false,
      Id: todoId
    };
    saveTodos();
    msg.value = ""; 
    todoId++;
  }
});

loadTodos();
renderTodos();


