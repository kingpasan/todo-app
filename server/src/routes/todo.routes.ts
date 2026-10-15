import { Router } from "express";
import {
  createTodo,
  getTodos,
  toggleTodoStatus,
  updateTodo,
} from "../controllers/todo.controller";

const router = Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.patch("/:id/done", toggleTodoStatus);

export default router;
