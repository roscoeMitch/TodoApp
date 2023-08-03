import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className="Todo">
      <div
        onClick={() => toggleComplete(task.id)}
        className={`${task.completed ? "completed" : ""} `}
      >
        <div className="task-title">{task.task}</div>

        <div className="priority-text">
          Priority Level:{" "}
          <span className="priority-title">{task.priority}</span>
        </div>

        <div className="priority-text">
          Status: <span className="priority-title">{task.status}</span>
        </div>
      </div>
      <div>
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  );
};
