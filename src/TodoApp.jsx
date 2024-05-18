import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  function handleInputChange(e) {
    setTaskInput(e.target.value);
  }

  function addTask() {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, { text: taskInput, isEditing: false }]);
      setTaskInput("");
    }
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function editTask(index) {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  }

  function handleEditChange(e, index) {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, text: e.target.value } : task
      )
    );
  }

  function saveTask(index) {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, isEditing: false } : task
      )
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Todo App</h1>
      <div className="mb-3">
        <label htmlFor="inp" className="form-label">
          Enter your Task
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Your Task"
          id="inp"
          value={taskInput}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={addTask}>
        Add
      </button>
      <ul className="list-group mt-3">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {task.isEditing ? (
              <>
                <input
                  type="text"
                  className="form-control me-2"
                  value={task.text}
                  onChange={(e) => handleEditChange(e, index)}
                />
                <button
                  className="btn btn-success"
                  onClick={() => saveTask(index)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <div>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => editTask(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
