import { Router } from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.controller";

const router = Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);

export default router;
