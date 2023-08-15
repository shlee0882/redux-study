import './App.css';

import React from 'react';
import { Provider } from 'react-redux';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Todo List with Redux</h1>
        <AddTodo />
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;

