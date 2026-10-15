import type {
  ApiResponse,
  CreateTodoInput,
  Todo,
  UpdateTodoInput,
} from "@/types/todo";

const API_URL = "/api";

const request = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message || "Something went wrong. Please try again.",
    );
  }

  return result as T;
};
export const todoApi = {
  async getAll(): Promise<Todo[]> {
    const result = await request<ApiResponse<Todo[]>>("/todos");
    return result.data;
  },

  async create(input: CreateTodoInput): Promise<Todo> {
    const result = await request<ApiResponse<Todo>>("/todos", {
      method: "POST",
      body: JSON.stringify(input),
    });

    return result.data;
  },

  async update(id: string, input: UpdateTodoInput): Promise<Todo> {
    const result = await request<ApiResponse<Todo>>(`/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(input),
    });

    return result.data;
  },

  async updateStatusDone(id: string): Promise<Todo> {
    const result = await request<ApiResponse<Todo>>(`/todos/${id}/done`, {
      method: "PATCH",
    });

    return result.data;
  },

  async delete(id: string): Promise<void> {
    await request<{ success: boolean }>(`/todos/${id}`, {
      method: "DELETE",
    });
  },
};
