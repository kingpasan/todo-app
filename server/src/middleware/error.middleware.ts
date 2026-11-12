import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";
import { NotFoundError } from "../services/todo.service";

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  if (error instanceof NotFoundError) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (error?.name === "ValidationError") {
    res.status(400).json({
      success: false,
      message: "Invalid TODO data",
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
