import { useMemo, useState } from "react";
import type { CreateTodoInput, Page, Todo, TodoFilter } from "./types/todo";
import AppSidebar from "@/components/layout/AppSidebar";
import DashboardHeader from "@/components/layout/DashboardHeader";
import SummaryCards from "@/components/SummaryCards";
import TodoForm from "@/components/TodoForm";
import { todoApi } from "@/services/todoApi";
import AlertDialog from "./components/AlertDialog";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>("tasks");
  const [filter, setFilter] = useState<TodoFilter>("All");
  const [search, setSearch] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [apiError, setApiError] = useState<{
    title: string;
    message: string;
    showAlert: boolean;
  } | null>();

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);

    if (page === "completed") {
      setFilter("Completed");
    } else if (page === "today") {
      setFilter("Active");
    } else if (page === "tasks") {
      setFilter("All");
    }
  };

  const counts = useMemo(
    () => ({
      all: todos.length,
      active: todos.filter((todo) => !todo.done).length,
      completed: todos.filter((todo) => todo.done).length,
    }),
    [todos],
  );

  const handleSave = async (data: CreateTodoInput) => {
    try {
      setApiError(null);

      if (editingTodo) {
        const updatedTodo = await todoApi.update(editingTodo._id, data);

        setTodos((current) =>
          current.map((todo) =>
            todo._id === editingTodo._id ? updatedTodo : todo,
          ),
        );

        setEditingTodo(null);
        return;
      }

      const newTodo = await todoApi.create(data);

      setTodos((current) => [newTodo, ...current]);
    } catch (error) {
      setApiError({
        showAlert: true,
        title: editingTodo ? "Update Task" : "Create New Task",
        message:
          error instanceof Error ? error.message : "Failed to save task.",
      });
    }
  };

  return (
    <>
      <AlertDialog
        open={apiError?.showAlert}
        onOpenChange={(open) =>
          setApiError((prev) => (prev ? { ...prev, showAlert: open } : null))
        }
        title={apiError?.title}
        message={apiError?.message}
      />

      <div className="min-h-screen bg-[#fefef5] text-slate-900">
        <div className="mx-auto flex min-h-screen gap-5 p-4 md:p-5">
          <AppSidebar currentPage={currentPage} onNavigate={handleNavigate} />
          <main className="min-w-0 flex-1">
            <DashboardHeader search={search} onSearchChange={setSearch} />
            <SummaryCards
              total={counts.all}
              active={counts.active}
              completed={counts.completed}
            />
            <div className="grid items-stretch gap-5 xl:grid-cols-[minmax(330px,0.78fr)_minmax(0,1.5fr)]">
              <TodoForm
                editingTodo={editingTodo}
                onSubmit={handleSave}
                onCancel={() => setEditingTodo(null)}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
