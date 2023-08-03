import React, { useState } from "react";
import axios from "axios";

export const Form = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [priority, setPriority] = useState("");
  const [newStatus, setNewStatus] = useState("Incomplete");

  const handleSubmit = (e) => {
    e.preventDefault();

    addTodo(value, priority, newStatus);

    const todoData = {
      task: value,
      priority: priority,
      status: newStatus,
      complete: false,
      isEditing: false,
    };

    // POST Todo to mongoDB database
    axios
      .post("http://localhost:3500/todo", todoData)
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(
            "Server responded with status code:",
            error.response.status
          );
          console.log("Response data:", error.response.data);
        } else if (error.request) {
          console.log("No response received:", error.request);
        } else {
          console.log("Error creating request:", error.message);
        }
      });

    setValue(""); // Returns the text-box back to default once todo has been sumitted
  };
  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        value={value}
        type="text"
        className="todo-input-priority"
        placeholder="Enter a task"
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="TodoForm">
        <select
          className="todo-input"
          placeholder="Select a priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Select a priority" disabled>
            Select a prioity
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>

      <button type="submit" className="todo-btn">
        Add
      </button>
    </form>
  );
};
