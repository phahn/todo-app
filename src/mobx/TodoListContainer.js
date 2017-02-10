import React from 'react';
import { observer } from 'mobx-react';

import TodoList from '../components/TodoList';

class StatefulTodoList extends React.Component {
  render() {
    const { state } = this.props;
    return (
      <TodoList
        title="Mobx"
        todos={state.visibleTodos}
        filter={state.filter}
        activeCount={state.activeCount}
        applyFilter={state.setFilter}
        toggleAll={state.toggleAll}
        toggleTodo={state.toggleTodo}
        addTodo={state.addTodo}
        removeAllCompleted={state.removeAllCompleted}
        removeTodo={state.removeTodo}
      />
    );
  }
}
export default observer(StatefulTodoList);

