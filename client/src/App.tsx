import { useMemo, useState } from "react";
import type {
  CreateTodoInput,
  Page,
  SortOrder,
  Todo,
  TodoFilter,
} from "./types/todo";
import AppSidebar from "@/components/layout/AppSidebar";
import DashboardHeader from "@/components/layout/DashboardHeader";
import SummaryCards from "@/components/SummaryCards";
import TodoForm from "@/components/TodoForm";
import { todoApi } from "@/services/todoApi";
import AlertDialog from "@/components/AlertDialog";
import { ListTodo } from "lucide-react";
import TodoSortOrder from "@/components/TodoSortOrder";
import TodoFilters from "@/components/TodoFilters";

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
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

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
              <section className="min-w-0 rounded-lg border border-white bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-600">
                      <ListTodo className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold tracking-tight">
                        My Tasks
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Manage and organize your tasks.
                      </p>
                    </div>
                  </div>

                  <TodoSortOrder
                    value={sortOrder}
                    onValueChange={(value) => setSortOrder(value as SortOrder)}
                  />
                </div>
                <TodoFilters
                  filter={filter}
                  onChange={setFilter}
                  counts={counts}
                />
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
