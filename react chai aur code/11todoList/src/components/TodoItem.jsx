import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { editTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodoFunction = () => {
    editTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const togglefunction = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex border rounded-lg px-3 py-1.5 gap-x-3 shadow-sm duration-300 text-black dark:text-white 
      ${todo.complete ? 'bg-green-200 dark:bg-green-700' : 'bg-violet-200 dark:bg-violet-800'}
      border-gray-300 dark:border-gray-600 shadow-white/50 dark:shadow-black/40`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.complete}
        onChange={togglefunction}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg transition-colors duration-200 
        ${isTodoEditable ? 'border-gray-400 dark:border-gray-600 px-2' : 'border-transparent'} 
        ${todo.complete ? 'line-through' : ''}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit / Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border justify-center items-center 
        bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 
        border-gray-300 dark:border-gray-600 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.complete) return;
          isTodoEditable ? editTodoFunction() : setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.complete}
      >
        {isTodoEditable ? '📁' : '✏️'}
      </button>
      {/* Delete Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border justify-center items-center 
        bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 
        border-gray-300 dark:border-gray-600 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
