export type Page = "tasks" | "today" | "completed";
export type TodoFilter = "All" | "Active" | "Completed";

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
