import { extendObservable, action, computed } from 'mobx';

let id = 0;

export default class CounterState {
  constructor() {
    extendObservable(this, {
      todos: [],
      filter: 'all',
      setFilter: action((type) => {
        this.filter = type;
      }),
      addTodo: action((title) => {
        this.todos.push({ id: id++, title, completed: false });
      }),
      removeTodo: action((id) => {
        const todo = this.todos.find(todo => todo.id === id);
        const index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
      }),
      toggleTodo: action((id, completed) => {
        const todo = this.todos.find(todo => todo.id === id);
        todo.completed = completed;
      }),
      toggleAll: action((completed) => {
        this.todos.forEach((todo) => {
          todo.completed = completed;
        });
      }),
      removeAllCompleted: action(() => {
        this.todos = this.todos.filter(todo => !todo.completed);
      }),
      isVisible: (todo) => {
        switch (this.filter) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return true;
        }
      },
      visibleTodos: computed(() => {
        return this.todos.filter(todo => this.isVisible(todo));
      }),
      activeCount: computed(() => {
        return this.todos.reduce(
          (sum, todo) => sum + (todo.completed ? 0 : 1),
          0
        )
      })

    });
  }
}