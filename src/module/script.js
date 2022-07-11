import deleteIcon from '../assets/deleteIcon.png';

const ul = document.getElementById('todo_list');
let todos = JSON.parse(localStorage.getItem('todos')) || [];
export const getToDos = () => todos;
export const setToDos = (newTodos) => {
  todos = newTodos;
};

export const addToDo = (todo) => {
  const txtInput = {
    description: todo.description,
    completed: todo.completed,
    index: todo.index,
  };

  todos.push(txtInput);
  localStorage.setItem('todos', JSON.stringify(todos));
  return txtInput;
};

export const removeTodos = (predicate, todos) => todos.filter(predicate).map((todo, index) => {
  todo.index = index + 1;
  return todo;
});

export const createToDo = ({ description, completed, index }) => {
  const li = document.createElement('li');
  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  const item = document.createElement('span');
  item.classList.add('content');
  item.appendChild(document.createTextNode(description));
  item.contentEditable = true;
  const removeBtn = document.createElement('input');
  removeBtn.setAttribute('type', 'image');
  removeBtn.setAttribute('src', deleteIcon);
  removeBtn.classList.add('btn_remove');
  li.append(checkBox, item, removeBtn);

  ul.appendChild(li);
  checkBox.addEventListener('change', () => {
    const todo = todos.find((todo) => todo.index === index);

    if (checkBox.checked) {
      todo.completed = true;
    } else {
      todo.completed = false;
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  });
  item.addEventListener('input', (e) => {
    const todo = todos.find((todo) => todo.index === index);
    todo.description = e.target.outerText;
    localStorage.setItem('todos', JSON.stringify(todos));
  });
  removeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newTodos = removeTodos((todo) => todo.index !== index, todos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setToDos(newTodos);
    // eslint-disable-next-line no-use-before-define
    refreshToDos();
  });
  return { description, completed, index };
};

export const refreshToDos = () => {
  let child = ul.lastElementChild;
  while (child) {
    ul.removeChild(child);
    child = ul.lastElementChild;
  }
  getToDos().forEach(createToDo);
};