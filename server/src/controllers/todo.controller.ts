import { RequestHandler } from "express";
import { createNewTodo, getAllTodos } from "../services/todo.service";
import { createTodoSchema } from "../schemas/todo.schema";

export const getTodos: RequestHandler = async (_req, res, next) => {
  try {
    const todos = await getAllTodos();
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    next(error);
  }
};

export const createTodo: RequestHandler = async (req, res, next) => {
  try {
    const data = createTodoSchema.parse(req.body);
    const todo = await createNewTodo(data);

    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};
