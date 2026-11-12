import type { TodoFilter } from "@/types/todo";

type TodoFiltersProps = {
  filter: TodoFilter;
  counts: {
    all: number;
    today: number;
    active: number;
    completed: number;
  };
  onChange: (filter: TodoFilter) => void;
};

const filters: {
  value: TodoFilter;
  label: string;
  countKey: keyof TodoFiltersProps["counts"];
}[] = [
  { value: "All", label: "All", countKey: "all" },
  { value: "Today", label: "Today", countKey: "today" },
  { value: "Active", label: "Active", countKey: "active" },
  { value: "Completed", label: "Completed", countKey: "completed" },
];

const TodoFilters = ({ filter, counts, onChange }: TodoFiltersProps) => {
  return (
    <div
      className="mb-3 flex gap-2 overflow-x-auto pb-1"
      aria-label="Filter tasks"
    >
      {filters.map((item) => {
        const selected = filter === item.value;

        return (
          <button
            key={item.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(item.value)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm  ${
              selected
                ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {item.label}
            <span className="ml-1 opacity-75">({counts[item.countKey]})</span>
          </button>
        );
      })}
    </div>
  );
};

export default TodoFilters;
