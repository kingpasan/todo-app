import { Todo } from "../models/todo.model";

class NotFoundError extends Error {
  constructor(message = "TODO not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

const getAllTodos = async () => {
  return Todo.find().sort({ createdAt: -1 }).lean();
};

const createNewTodo = async (data: { title: string; description?: string }) => {
  return Todo.create(data);
};

const updateExistingTodo = async (
  id: string,
  data: { title?: string; description?: string },
) => {
  const todo = await Todo.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true },
  );

  if (!todo) throw new NotFoundError();
  return todo;
};

const toggleStatus = async (id: string) => {
  const todo = await Todo.findById(id);

  if (!todo) throw new NotFoundError();

  todo.done = !todo.done;
  await todo.save();

  return todo;
};

export {
  NotFoundError,
  getAllTodos,
  createNewTodo,
  updateExistingTodo,
  toggleStatus,
};
