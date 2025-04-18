const Todo = require('../models/TodoList.js');

// Create a new Todo
exports.createTodo = async (req, res) => {
  try {
    const { task, createdBy, dueDate, description } = req.body;
    const newTodo = new Todo({ task, createdBy, dueDate, description });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error });
  }
};

// Get all Todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error });
  }
};

// Get Todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todo', error });
  }
};

// Update Todo by ID
exports.updateTodo = async (req, res) => {
  try {
    const { task, createdBy, dueDate, description } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { task, createdBy, dueDate, description },
      { new: true, runValidators: true }
    );
    if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error });
  }
};

// Delete Todo by ID
exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error });
  }
};
