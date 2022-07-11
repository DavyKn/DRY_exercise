import './style.css';
import refresh from './assets/refresh.png';

import { getToDos, addToDo, createToDo } from './module/script.js';
import clearToDoItems from './module/interactive.js';

const titleDiv = document.querySelector('.title_class');
const clearCompleted = document.querySelector('.clear');
const input = document.querySelector('.desc');

const refreshB = document.createElement('img');
refreshB.classList.add('reload');
refreshB.setAttribute('src', refresh);
titleDiv.appendChild(refreshB);

getToDos().forEach(createToDo);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const completed = false;
    const description = document.querySelector('.desc').value;
    const index = getToDos().length + 1;
    const newTodo = createToDo({ description, completed, index });
    addToDo(newTodo);
    input.value = '';
  }
});

clearCompleted.addEventListener('click', clearToDoItems);
