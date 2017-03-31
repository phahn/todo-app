import React from 'react';
import ReactDOM from 'react-dom';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

import './style.css';

// mobx
import { default as MobxTodoList }  from './mobx/TodoListContainer';
import { default as MobxTodoState } from './mobx/TodoState';

// create mobx state
const todoState = new MobxTodoState();
todoState.addTodo('Visit dotJS Paris');
todoState.addTodo('Prepare Mobx example');
todoState.addTodo('Prepare slides');

// redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducer';
import { default as ReduxTodoList } from './redux/container';
import { addTodo } from './redux/actions';

const state = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
state.dispatch(addTodo('Prepare slides'));
state.dispatch(addTodo('Prepare Redux example'));
state.dispatch(addTodo('Visit dotJS Paris'));

ReactDOM.render(
  <div className="container">
    <div className="todo-container">
      <MobxTodoList state={todoState} />
    </div>
    <div className="todo-container">
      <Provider store={state}>
        <ReduxTodoList state={todoState} />
      </Provider>
  </div>
  </div >,
  document.getElementById('root')
);
