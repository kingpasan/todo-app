import type { Page } from "@/types/todo";
import {
  Home,
  CalendarDays,
  CircleCheck,
  Lightbulb,
  ListTodo,
} from "lucide-react";

type AppSidebarProps = {
  currentPage: Page;
  onNavigate: (page: Page) => void;
};

const navigationItems = [
  { id: "tasks", label: "My Tasks", icon: Home },
  { id: "today", label: "Today", icon: CalendarDays },
  { id: "completed", label: "Completed", icon: CircleCheck },
] as const;

const AppSidebar = ({ currentPage, onNavigate }: AppSidebarProps) => {
  return (
    <aside className="h-full shrink-0 hidden w-62 flex-col rounded-[28px] border border-white bg-white/80 p-5 shadow-sm lg:flex">
      <div className="mb-10 flex items-center gap-3 px-1">
        <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-blue-600 text-white shadow-lg shadow-blue-200">
          <ListTodo className="h-7 w-7" strokeWidth={3} />
        </div>

        <span className="text-2xl font-bold tracking-tight">Todo App</span>
      </div>

      <nav className="space-y-2" aria-label="Main navigation">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-blue-100 bg-linear-to-br from-white to-blue-50 p-5">
        <div className="mb-3 grid h-9 w-9 place-items-center rounded-full bg-amber-100 text-amber-600">
          <Lightbulb className="h-5 w-5" />
        </div>

        <h3 className="font-semibold text-slate-800">Stay productive!</h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          “A little progress every day adds up to big results.”
        </p>
      </div>
    </aside>
  );
};

export default AppSidebar;
