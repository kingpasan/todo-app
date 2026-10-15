import { ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Todo, TodoFilter } from "@/types/todo";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  filter: TodoFilter;
  onToggle: (id: string, done: boolean) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onClearFilters: () => void;
};

const TodoList = ({
  todos,
  filter,
  onToggle,
  onEdit,
  onDelete,
  onClearFilters,
}: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <div className="py-14 text-center">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
          <ListTodo className="h-5 w-5" />
        </div>

        <h3 className="font-semibold text-slate-800">No tasks found</h3>

        <p className="mt-1 text-sm text-slate-500">
          {filter === "Completed"
            ? "Complete a task and it will appear here."
            : "Try another filter or create a new task."}
        </p>

        {filter !== "All" && (
          <Button
            type="button"
            variant="link"
            onClick={onClearFilters}
            className="mt-2 text-blue-600"
          >
            Clear filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
