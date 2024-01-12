import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, completeTodo, deleteTodo, selectTodos } from './features/todoSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [input, setInput] = useState('');
  const [selectedTodos, setSelectedTodos] = useState([]);
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  const handleAddTodo = () => {
    if (input.trim() !== '') {
      dispatch(addTodo({ text: input, completed: false }));
      setInput('');
    }
  };

  const handleCompleteTodo = (index) => {
    dispatch(completeTodo(index));
  };

  const handleDeleteTodo = (index) => {
    dispatch(deleteTodo(index));
  };

  const handleCheckboxChange = (index) => {
    const newSelectedTodos = [...selectedTodos];

    if (newSelectedTodos.includes(index)) {
      // If the todo is already selected, remove it from the list
      const indexToRemove = newSelectedTodos.indexOf(index);
      newSelectedTodos.splice(indexToRemove, 1);
    } else {
      // If the todo is not selected, add it to the list
      newSelectedTodos.push(index);
    }

    setSelectedTodos(newSelectedTodos);
  };

  const handleDeleteSelected = () => {
    const sortedSelectedTodos = selectedTodos.slice().sort((a, b) => b - a);
  sortedSelectedTodos.forEach((index) => {
    dispatch(deleteTodo(index));
  });

  // Clear selected todos
  setSelectedTodos([]);
  };

  return (
    <div className="container mt-5">
      <h1 className="display-4 mb-4">To Do App</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add Todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>

      <ul className="list-group">
        {todos.map((todo, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <input
                type="checkbox"
                checked={selectedTodos.includes(index)}
                onChange={() => handleCheckboxChange(index)}
              />
              <span className={todo.completed ? 'ms-2 text-decoration-line-through' : 'ms-2'}>{todo.text}</span>
            </div>
            <div>
              <button className="btn btn-success me-2" onClick={() => handleCompleteTodo(index)}>
                Complete
              </button>
              <button className="btn btn-danger" onClick={() => handleDeleteTodo(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedTodos.length > 0 && (
        <div className="mt-3">
          <button className="btn btn-danger" onClick={handleDeleteSelected}>
            Delete Selected
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
