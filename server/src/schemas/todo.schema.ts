import z from "zod";

const createTodoSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(120),
  description: z.string().trim().max(1000).optional().default(""),
});

export { createTodoSchema };
