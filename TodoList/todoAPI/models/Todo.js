const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    unique: true,
  },

  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },

  priority: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  isEditing: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
