import { Todo } from "../models/todo.model";

const getAllTodos = async () => {
  return Todo.find().sort({ createdAt: -1 }).lean();
};

const createNewTodo = async (data: { title: string; description?: string }) => {
  return Todo.create(data);
};

export { getAllTodos, createNewTodo };
