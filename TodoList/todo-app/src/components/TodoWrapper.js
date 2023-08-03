import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "./Form";
import { Todo } from "./Todo";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

uuidv4();

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const history = useHistory();

  const addTodo = (todo, priority, newStatus) => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        task: todo,
        completed: false,
        isEditing: false,
        priority: priority,
        status: newStatus,
      },
    ]);
  };

  // fetches all the todo data from the db
  /* useEffect(() => {
    async function getTodos() {
      axios
        .get("http://localhost:3500/todo")
        .then((response) => {
          setTodos(response.data);
        })
        .catch(function (error) {
          if (error.response.data) {
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
    }
    getTodos();
    return;
  }, [setTodos.length]); */

  // A function to strike-out text when task is complete
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Deletes the todo when the trash can is clicked
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Expands the editing screen when pen is clicked
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Updates the values of the todo when editing is complete
  const editTask = (task, id, status, priority) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, task, status, priority, isEditing: !todo.isEditing }
          : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>To Do List</h1>
      <Form addTodo={addTodo} />

      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
