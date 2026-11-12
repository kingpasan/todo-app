import z from "zod";

const createTodoSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(120),
  description: z.string().trim().max(1000).optional().default(""),
});

const todoIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid TODO ID");

const updateTodoSchema = z
  .object({
    title: z.string().trim().min(1).max(120).optional(),
    description: z.string().trim().max(1000).optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    "Provide at least one field to update",
  );

export { createTodoSchema, todoIdSchema, updateTodoSchema };
