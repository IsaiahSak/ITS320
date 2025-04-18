const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  createdBy: { type: String, required: true },
  dueDate: { type: Date, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now } // Optional: timestamp when the task was added
});

module.exports = mongoose.model("Todo", TodoSchema);