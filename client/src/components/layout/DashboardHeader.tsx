import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type DashboardHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

const DashboardHeader = ({ search, onSearchChange }: DashboardHeaderProps) => {
  return (
    <header className="mb-6 flex flex-col justify-between gap-5 px-1 py-2 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-[34px]">
          Welcome Back, <span aria-hidden="true">👋</span>
        </h1>

        <p className="mt-1 text-base text-slate-500">
          Here's your tasks overview.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative min-w-0 flex-1 sm:w-64 sm:flex-none">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search todo tasks..."
            aria-label="Search todo tasks"
            className="h-11 rounded-xl border-slate-200 bg-white pl-10 shadow-none focus-visible:ring-blue-200"
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
