import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo, UpdateTodo,toggleTodo } from '../features/todo/todoSlice';

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editableId, setEditableId] = useState(null);
  const [updatedText, setUpdatedText] = useState('');

  const handleEdit = (todo) => {
    setEditableId(todo.id);
    setUpdatedText(todo.text);
  };

  const handleUpdate = () => {
    dispatch(UpdateTodo({ id: editableId, text: updatedText }));
    setEditableId(null);
    setUpdatedText('');
  };

  return (
    <>
      <div className="mt-8 text-2xl text-center">Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            {editableId === todo.id ? (
              <>
                <input
                  type="text"
                  className="text-white p-1 rounded"
                  value={updatedText}
                  onChange={(e) => setUpdatedText(e.target.value)}
                />
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-3 py-1 rounded ml-2"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => dispatch(toggleTodo({ id: todo.id }))}
                    />
                <div className={todo.completed ? 'line-through text-gray-400' : 'text-white'}>{todo.text}</div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(removeTodo({ id: todo.id }))}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;
