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

export { NotFoundError, getAllTodos, createNewTodo };
