import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Todo } from "@/types/todo";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string, done: boolean) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
};

const TodoItem = ({ todo, onToggle, onEdit, onDelete }: TodoItemProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const date = new Date(todo.createdAt);

  const handleShowConfirmationDelete = () => {
    setConfirmDelete(true);
  };
  return (
    <>
      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Delete this task?"
        message={`Are you sure you want to delete "${todo.title}"? This action cannot be undone.`}
        onAction={() => onDelete(todo)}
      />
      <article className="group flex items-start gap-3 border-b border-slate-100 py-4 last:border-b-0">
        <Checkbox
          checked={todo.done}
          onCheckedChange={(checked) => onToggle(todo._id, checked === true)}
          aria-label={`Mark ${todo.title} as ${todo.done ? "active" : "completed"}`}
          className="mt-1 h-5 w-5 rounded-md data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
        />

        <div className="min-w-0 flex-1">
          <h3
            className={`wrap-break-word text-sm font-semibold ${
              todo.done ? "text-slate-400 line-through" : "text-slate-900"
            }`}
          >
            {todo.title}
          </h3>

          {todo.description && (
            <p className="mt-1 text-xs leading-5 text-slate-500">
              {todo.description}
            </p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-2 sm:hidden">
            <span className="text-xs text-slate-400">{todo.createdAt}</span>
          </div>
        </div>

        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          <span className="w-full text-right text-xs text-slate-400">
            {date.toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onEdit(todo)}
            aria-label={`Edit ${todo.title}`}
            className="h-8 w-8 rounded-lg text-slate-500 hover:text-blue-600"
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleShowConfirmationDelete}
            aria-label={`Delete ${todo.title}`}
            className="h-8 w-8 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </article>
    </>
  );
};

export default TodoItem;
