import { useState } from "react";
import AppSidebar from "./components/layout/AppSidebar";
import type { Page, TodoFilter } from "./types/todo";

const App = () => {
  const [currentPage, setCurrentPage] = useState<Page>("tasks");
  const [filter, setFilter] = useState<TodoFilter>("All");

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
  return (
    <div className="min-h-screen bg-[#fefef5] text-slate-900">
      <div className="mx-auto flex min-h-screen gap-5 p-4 md:p-5">
        <AppSidebar currentPage={currentPage} onNavigate={handleNavigate} />
        <main className="min-w-0 flex-1">Main Content</main>
      </div>
    </div>
  );
};

export default App;
