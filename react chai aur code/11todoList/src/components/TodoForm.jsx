import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
  const [todo, setTodo] = useState('');
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo: todo, complete: false });
    setTodo('');
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-gray-300 dark:border-gray-600 rounded-l-lg px-3 outline-none duration-150 bg-white dark:bg-gray-800 text-black dark:text-white py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 hover:bg-green-700 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
