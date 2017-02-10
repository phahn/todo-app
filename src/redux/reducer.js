import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, TOGGLE_ALL, SET_FILTER, REMOVE_ALL } from './actions';

const initialState = {
  todos: [],
  filterType: 'all'
};

function addTodo(state, action) {
  return {
    ...state,
    todos: [action.todo, ...state.todos]
  }
}

function removeTodo(state, action) {
  return {
    ...state,
    todos: state.todos.filter(todo => todo.id !== action.id)
  }
}

function removeAll(state, action) {
  return {
    ...state,
    todos: state.todos.filter(todo => !todo.completed)
  }
}

function setFilter(state, action) {
  return {
    ...state,
    filterType: action.filterType
  };
}

function toggleAll(state, action) {
  return {
    ...state,
    todos: state.todos.map(todo => {
      return {
        ...todo,
        completed: action.completed
      }
    })
  };
}

function toggleTodo(state, action) {
  return {
    ...state,
    todos: state.todos.map(todo => {
      if (action.id === todo.id) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo;
    })
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return addTodo(state, action);
    case REMOVE_TODO:
      return removeTodo(state, action);
    case TOGGLE_TODO:
      return toggleTodo(state, action);
    case TOGGLE_ALL:
      return toggleAll(state, action);
    case SET_FILTER:
      return setFilter(state, action);
    case REMOVE_ALL:
      return removeAll(state, action);
    default:
      return state;
  }
}
