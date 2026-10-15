import { RequestHandler } from "express";
import {
  createNewTodo,
  deleteTodoById,
  getAllTodos,
  toggleStatus,
  updateExistingTodo,
} from "../services/todo.service";
import {
  createTodoSchema,
  todoIdSchema,
  updateTodoSchema,
} from "../schemas/todo.schema";

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

export const updateTodo: RequestHandler = async (req, res, next) => {
  try {
    const id = todoIdSchema.parse(req.params.id);
    const data = updateTodoSchema.parse(req.body);
    const todo = await updateExistingTodo(id, data);

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

export const toggleTodoStatus: RequestHandler = async (req, res, next) => {
  try {
    const id = todoIdSchema.parse(req.params.id);
    const todo = await toggleStatus(id);

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo: RequestHandler = async (req, res, next) => {
  try {
    const id = todoIdSchema.parse(req.params.id);
    await deleteTodoById(id);

    res.status(200).json({
      success: true,
      message: "TODO deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
