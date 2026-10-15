import { RequestHandler } from "express";
import { getAllTodos } from "../services/todo.service";

export const getTodos: RequestHandler = async (_req, res, next) => {
  try {
    const todos = await getAllTodos();
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    next(error);
  }
};
