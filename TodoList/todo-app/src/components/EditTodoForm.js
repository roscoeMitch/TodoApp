import React, { useState } from "react";

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);
  const [newStatus, setNewStatus] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    editTodo(value, task.id, newStatus, priority);
    setValue("");
  };
  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        value={value}
        type="text"
        className="todo-input"
        placeholder="Update Task"
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="todo-input-item">
        <select
          className="status-selector"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          placeholder="Please Select"
        >
          <option value="unselected">Please Select</option>
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="complete">Complete</option>
        </select>
      </div>
      <div className="todo-input-item">
        <select
          className="status-selector"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
};
