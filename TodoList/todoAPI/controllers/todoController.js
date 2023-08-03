const Todo = require("../models/Todo");
const asyncHandler = require("express-async-handler");

// @desc GET all todos
// @route GET /todos
// @access Private

const getAllTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find().lean();

  if (!todos?.length) {
    return res.status(400).json({ message: "no todos found" });
  }

  res.json(todos);
});

// @desc POST new todo
// @route POST /todos
// @access Private
const createNewTodo = asyncHandler(async (req, res) => {
  const { task, isCompleted, priority, status, isEditing } = req.body;

  // confirm data exists
  /* if (!task || !priority || !status || isCompleted == null) {
    res.status(400).json({ message: "Missing data fields" });
  } */

  // Validate that task names are unique
  const duplicate = await Todo.findOne({ task }).lean().exec();

  if (duplicate) {
    res.status(409).json({ message: "This task already exists" });
  }

  const todoObject = { task, isCompleted, priority, status, isEditing };

  // create and store new todo
  const todos = await Todo.create(todoObject);

  if (todos) {
    res.status(201).json({ message: `New ${task} task created` });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

// @desc Update a todo
// @route PATCH /todo
// @access Private
const updateTodo = asyncHandler(async (req, res) => {
  const { id, task, isCompleted, priority, status } = req.body;

  // Confirm data
  /*  if (!id || !task || !isCompleted || !priority || !status) {
    return res.status(400).json({ message: "All fields required" });
  } */

  // Check that the todo exists
  const todo = await Todo.findById(id).exec();

  if (!todo) {
    return res.status(400).json({ message: "Todo not found" });
  }

  // Check for duplication
  const duplicate = await Todo.findOne({ task }).lean().exec();

  // Allows editing of existing todos
  if (duplicate && duplicate?.toString() !== id) {
    return res.status(409).json({ message: "Todo already exists" });
  }

  todo.task = task;
  todo.isCompleted = isCompleted;
  todo.status = status;
  todo.priority = priority;

  const updatedTodo = await todo.save();

  res.json({ message: `${updatedTodo.task} has been updated` });
});

// @desc Delete todos
// @route DELETE /todo
// @access Private
const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Validate ID
  if (!id) {
    return res.status(400).json({ message: "Todo ID required" });
  }

  const todo = await Todo.findById(id).exec();

  // Validate Todo exists
  if (!todo) {
    return res.status(400).json({ message: "Todo not found" });
  }

  // Deletes Todo
  const result = await todo.deleteOne();

  const message = `${result.task} has been deleted`;

  res.json(message);
});

module.exports = {
  getAllTodos,
  createNewTodo,
  updateTodo,
  deleteTodo,
};
