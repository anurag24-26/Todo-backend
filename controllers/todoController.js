const Todo = require("../models/Todo");

const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.json(todos);
};

const createTodo = async (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  const todo = await Todo.create({
    user: req.user.id,
    title,
    description,
    priority,
    dueDate,
  });
  res.status(201).json(todo);
};

const updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo || todo.user.toString() !== req.user.id)
    return res.status(401).json({ message: "Not authorized" });

  Object.assign(todo, req.body);
  await todo.save();
  res.json(todo);
};

const deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo || todo.user.toString() !== req.user.id)
    return res.status(401).json({ message: "Not authorized" });

  await todo.remove();
  res.json({ message: "Todo deleted" });
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
