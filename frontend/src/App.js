import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  // Fetch tasks from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(response => setTasks(response.data))
      .catch(err => console.error(err));
  }, []);

  // Handle new task input
  const handleTaskInput = (e) => {
    setNewTask(e.target.value);
  };

  // Add a new task
  const addTask = () => {
    if (!newTask.trim()) return;

    axios.post('http://localhost:5000/api/tasks', { title: newTask })
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask('');
      })
      .catch(err => console.error(err));
  };

  // Delete a task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch(err => console.error(err));
  };

  // Set edit mode for task
  const setEditMode = (id) => {
    const taskToEdit = tasks.find(task => task._id === id);
    setCurrentTask(taskToEdit);
    setIsEditing(true);
  };

  // Update the task
  const updateTask = () => {
    axios.put(`http://localhost:5000/api/tasks/${currentTask._id}`, currentTask)
      .then(response => {
        setTasks(tasks.map(task => task._id === currentTask._id ? response.data : task));
        setIsEditing(false);
        setCurrentTask({});
      })
      .catch(err => console.error(err));
  };

  // Handle input for editing task
  const handleEditInput = (e) => {
    setCurrentTask({ ...currentTask, title: e.target.value });
  };

  // Toggle task completion
  const toggleComplete = (id, completed) => {
    axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed })
      .then(response => {
        setTasks(tasks.map(task => task._id === id ? response.data : task));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-header">To-Do List</h1>

      <div className="add-task-input">
        <input
          type="text"
          placeholder={isEditing ? 'Edit task' : 'Add a new task'}
          value={isEditing ? currentTask.title : newTask}
          onChange={isEditing ? handleEditInput : handleTaskInput}
        />
        {isEditing ? (
          <button className="edit" onClick={updateTask}>Update Task</button>
        ) : (
          <button className="add-task" onClick={addTask}>Add Task</button>
        )}
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task._id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task._id, task.completed)}
            />
            <span>{task.title}</span>
            <button className="edit" onClick={() => setEditMode(task._id)}>Edit</button>
            <button className="delete" onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
