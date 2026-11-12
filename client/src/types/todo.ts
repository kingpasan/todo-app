export type Page = "tasks" | "today" | "completed";
export type TodoFilter = "All" | "Active" | "Today" | "Completed";
export type SortOrder = "newest" | "oldest";

export type Todo = {
  _id: string;
  title: string;
  description: string;
  done: boolean;
  createdAt: string;
  updatedAt?: string;
};

export type CreateTodoInput = {
  title: string;
  description: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type UpdateTodoInput = Partial<CreateTodoInput>;
