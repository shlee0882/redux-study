import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../redux/actions';

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.content}
      </span>
      <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
    </div>
  );
}

export default TodoItem;
