import { Todo } from "../models/todo.model";

const getAllTodos = async () => {
  return Todo.find().sort({ createdAt: -1 }).lean();
};

export { getAllTodos };
