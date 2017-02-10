export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const TOGGLE_ALL = 'TOGGLE_ALL';
export const REMOVE_ALL = 'REMOVE_ALL';
export const SET_FILTER = 'SET_FILTER';

let id = 0;

export function addTodo(title) {
  return {
    type: ADD_TODO,
    todo: {
      title,
      id: id++,
      completed: false,
    }
  }
}

export function removeTodo(id) {
  return {
    type: REMOVE_TODO,
    id
  }
}

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    id
  }
}

export function toggleAll(completed) {
  return {
    type: TOGGLE_ALL,
    completed
  }
}

export function removeAll() {
  return {
    type: REMOVE_ALL
  }
}

export function setFilter(type) {
  return {
    type: SET_FILTER,
    filterType: type
  }
}
