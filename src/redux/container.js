import { connect } from 'react-redux';

import { addTodo, removeTodo, removeAll, toggleTodo, toggleAll, setFilter } from './actions';

import TodoList from '../components/TodoList';

function isVisible(todo, filter) {
  switch (filter) {
    case 'active':
      return !todo.completed;
    case 'completed':
      return todo.completed;
    default:
      return true;
  }
}

function getVisibleTodos(state) {
  return state.todos.filter(todo => isVisible(todo, state.filterType));
}

function getActiveTodos(state) {
  return state.todos.reduce((sum, todo) => sum + (todo.completed ? 0 : 1), 0);
}

const mapStateToProps = (state) => {
  return {
    title: "Redux",
    todos: getVisibleTodos(state),
    activeCount: getActiveTodos(state),
    filter: state.filterType
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (title) => {
      dispatch(addTodo(title))
    },
    removeTodo: (id) => {
      dispatch(removeTodo(id))
    },
    removeAllCompleted: () => {
      dispatch(removeAll())
    },
    toggleAll: (completed) => {
      dispatch(toggleAll(completed))
    },
    toggleTodo: (id) => {
      dispatch(toggleTodo(id))
    },
    applyFilter: (type) => {
      dispatch(setFilter(type))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);