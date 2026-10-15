import { useEffect, useMemo, useState } from "react";
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
import { ListTodo, Loader } from "lucide-react";
import TodoSortOrder from "@/components/TodoSortOrder";
import TodoFilters from "@/components/TodoFilters";
import TodoList from "./components/TodoList";

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
  const [loading, setLoading] = useState(true);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);

    if (page === "completed") {
      setFilter("Completed");
    } else if (page === "today") {
      setFilter("Today");
    } else if (page === "tasks") {
      setFilter("All");
    }
  };

  const counts = useMemo(() => {
    const now = new Date();

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    ).getTime();

    const startOfTomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    ).getTime();

    return {
      all: todos.length,
      active: todos.filter((todo) => !todo.done).length,
      completed: todos.filter((todo) => todo.done).length,
      today: todos.filter((todo) => {
        const createdAt = new Date(todo.createdAt).getTime();

        return createdAt >= startOfToday && createdAt < startOfTomorrow;
      }).length,
    };
  }, [todos]);

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

  const visibleTodos = useMemo(() => {
    const query = search.trim().toLowerCase();

    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    ).getTime();

    const startOfTomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    ).getTime();

    const filtered = todos.filter((todo) => {
      const matchesSearch =
        todo.title.toLowerCase().includes(query) ||
        (todo.description ?? "").toLowerCase().includes(query);

      const matchesFilter =
        filter === "All" ||
        (filter === "Active" && !todo.done) ||
        (filter === "Completed" && todo.done) ||
        (filter === "Today" &&
          new Date(todo.createdAt).getTime() >= startOfToday &&
          new Date(todo.createdAt).getTime() < startOfTomorrow);

      return matchesSearch && matchesFilter;
    });

    return filtered.sort((a, b) => {
      const difference =
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

      return sortOrder === "newest" ? difference : -difference;
    });
  }, [todos, search, filter, sortOrder]);

  const handleToggle = async (id: string) => {
    try {
      setApiError(null);

      await todoApi.updateStatusDone(id);

      setTodos((current) =>
        current.map((todo) =>
          todo._id === id ? { ...todo, done: !todo.done } : todo,
        ),
      );
    } catch (error) {
      setApiError({
        showAlert: true,
        title: "Mark as Done/Undone",
        message:
          error instanceof Error ? error.message : "Failed to update status.",
      });
    }
  };

  const handleDelete = async (todo: Todo) => {
    try {
      setApiError(null);

      await todoApi.delete(todo._id);

      setTodos((current) => current.filter((item) => item._id !== todo._id));

      if (editingTodo?._id === todo._id) {
        setEditingTodo(null);
      }
    } catch (error) {
      setApiError({
        showAlert: true,
        title: "Delete Task",
        message:
          error instanceof Error ? error.message : "Failed to delete task.",
      });
    }
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        setApiError(null);

        const result = await todoApi.getAll();
        setTodos(result);
      } catch (error) {
        setApiError({
          showAlert: true,
          title: "Loading Task",
          message:
            error instanceof Error ? error.message : "Failed to load tasks.",
        });
      } finally {
        setLoading(false);
      }
    };

    void loadTodos();
  }, []);

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

      <div className="h-screen overflow-hidden bg-[#fefef5] text-slate-900">
        <div className="mx-auto flex h-full gap-5 p-4 md:p-5">
          <AppSidebar currentPage={currentPage} onNavigate={handleNavigate} />
          <main className="custom-scrollbar min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4 md:px-5 md:py-5">
            <DashboardHeader search={search} onSearchChange={setSearch} />
            <SummaryCards
              total={counts.all}
              active={counts.active}
              completed={counts.completed}
            />
            <div className="grid items-stretch gap-5 xl:grid-cols-[minmax(330px,0.78fr)_minmax(0,1.5fr)]">
              <TodoForm
                key={editingTodo?._id ?? "new-task"}
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

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                      <Loader className="h-7 w-7 text-blue-600 animate-spin" />
                    </div>

                    <h3 className="text-base font-semibold text-slate-800">
                      Loading your tasks
                    </h3>

                    <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                      Hang tight! We're getting everything ready for you.
                    </p>
                  </div>
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    filter={filter}
                    onToggle={handleToggle}
                    onEdit={setEditingTodo}
                    onDelete={handleDelete}
                    onClearFilters={() => {
                      setFilter("All");
                      setSearch("");
                    }}
                  />
                )}

                <div className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-400">
                  <span>
                    Showing {visibleTodos.length} of {todos.length} tasks
                  </span>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
