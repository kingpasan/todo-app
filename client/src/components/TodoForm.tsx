import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Todo, CreateTodoInput } from "@/types/todo";
import AlertDialog from "./AlertDialog";

type TodoFormProps = {
  editingTodo: Todo | null;
  onSubmit: (data: CreateTodoInput) => void;
  onCancel: () => void;
};

const TodoForm = ({ editingTodo, onSubmit, onCancel }: TodoFormProps) => {
  const [title, setTitle] = useState(editingTodo?.title ?? "");
  const [description, setDescription] = useState(
    editingTodo?.description ?? "",
  );
  const [error, setError] = useState({
    showAlert: false,
    message: "",
  });

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle) {
      setError({ showAlert: true, message: "Please enter a task title." });
      return;
    }

    if (cleanTitle.length > 120) {
      setError({
        showAlert: true,
        message: "Title must be 120 characters or fewer.",
      });

      return;
    }

    if (cleanDescription.length > 1000) {
      setError({
        showAlert: true,
        message: "Description must be 1,000 characters or fewer.",
      });
      return;
    }

    onSubmit({
      title: cleanTitle,
      description: cleanDescription,
    });

    setTitle("");
    setDescription("");
    setError({
      showAlert: false,
      message: "",
    });
  };

  return (
    <>
      <AlertDialog
        open={error.showAlert}
        onOpenChange={(open) =>
          setError((prev) => ({ ...prev, showAlert: open }))
        }
        title={editingTodo ? "Update Task" : "Create New Task"}
        message={error.message}
      />

      <section className="rounded-lg border border-white bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue-600 text-white shadow-md shadow-blue-200">
            <Plus className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight">
              {editingTodo ? "Edit task" : "Create a New Task"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {editingTodo
                ? "Update the details of your task."
                : "Add a new task to keep track of your work."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="todo-title" className="text-sm font-semibold">
              Title <span className="text-rose-500">*</span>
            </label>

            <Input
              id="todo-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What do you need to do?"
              maxLength={120}
              className="h-12 rounded-xl border-slate-200 px-4"
            />

            <p className="text-right text-xs text-slate-400">
              {title.length}/120
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="todo-description" className="text-sm font-semibold">
              Description{" "}
              <span className="font-normal text-slate-400">(optional)</span>
            </label>

            <Textarea
              id="todo-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add more details..."
              maxLength={1000}
              rows={4}
              className="min-h-28 resize-y rounded-xl border-slate-200 px-4 py-3"
            />

            <p className="text-right text-xs text-slate-400">
              {description.length}/1000
            </p>
          </div>

          <div className="flex flex-row justify-center gap-2">
            {editingTodo && (
              <Button
                variant="outline"
                onClick={onCancel}
                className="h-12 flex flex-1"
              >
                <X />
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              variant={"default"}
              className="h-12 flex flex-2"
            >
              {editingTodo ? <Check /> : <Plus />}

              {editingTodo ? "Save changes" : "Add Task"}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default TodoForm;
