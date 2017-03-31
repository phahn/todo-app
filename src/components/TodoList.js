import React from 'react';

const TodoItem = ({ completed, title, onChange, onRemove }) => {
  return (
    <li className={completed && 'completed'}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={onChange} />
        <label>{title}</label>
        <button onClick={onRemove} className="destroy"></button>
      </div>
    </li>
  );
}

export default class TodoList extends React.Component {

  constructor(props) {
    super(props);
    this.toggleAll = this.toggleAll.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleToggleTodo = this._handleToggleTodo.bind(this);
    this._showAll = this._showAll.bind(this);
    this._showActive= this._showActive.bind(this);
    this._showCompleted = this._showCompleted.bind(this);
    this._removeTodo = this._removeTodo.bind(this);
    this.state = {
      currentTodo: ''
    }
  }

  toggleAll(event) {
    this.props.toggleAll(event.target.checked);
  }

  _handleChange(e) {
    this.setState({
      currentTodo: e.target.value
    })
  }

  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.addTodo(e.target.value);
      this.setState({
        currentTodo: ''
      })
    }
  }

  _handleToggleTodo(id, event) {
    const completed = event.target.checked;
    this.props.toggleTodo(id, completed);
  }

  _removeTodo(id) {
    this.props.removeTodo(id);
  }

  _showAll() {
    this.props.applyFilter('all');
  }

  _showActive() {
    this.props.applyFilter('active');
  }

  _showCompleted() {
    this.props.applyFilter('completed');
  }

  render() {
    const { filter, activeCount, title } = this.props;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>{title}</h1>
          <input className="new-todo" placeholder="What needs to be done?" autoFocus value={this.state.currentTodo} onKeyPress={this._handleKeyPress} onChange={this._handleChange} />
        </header>
        <section className="main">
          <input className="toggle-all" type="checkbox" onChange={this.toggleAll} />
          <ul className="todo-list">
            {
              this.props.todos.map(todo => <TodoItem onChange={this._handleToggleTodo.bind(null, todo.id)} onRemove={this._removeTodo.bind(null, todo.id)} key={todo.id} title={todo.title} completed={todo.completed} />)
            }
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count"><strong>{activeCount}</strong> item left</span>
          <ul className="filters">
            <li>
              <a className={filter === 'all' ? 'selected' : null} onClick={this._showAll} href="#">All</a>
            </li>
            <li>
              <a className={filter === 'active' ? 'selected' : null} href="#" onClick={this._showActive}>Active</a>
            </li>
            <li>
              <a className={filter === 'completed' ? 'selected' : null} href="#" onClick={this._showCompleted}>Completed</a>
            </li>
          </ul>
          <button onClick={this.props.removeAllCompleted} className="clear-completed">Clear completed</button>
        </footer>
      </section>
    );
  }
}