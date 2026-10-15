import { ListTodo, CheckCircle2, CircleAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedNumber from "./AnimatedNumber";

type SummaryCardsProps = {
  total: number;
  active: number;
  completed: number;
};

const statStyles = {
  blue: {
    card: "border-blue-100 bg-gradient-to-br from-blue-50 to-white",
    icon: "bg-blue-100 text-blue-600",
  },
  green: {
    card: "border-emerald-100 bg-gradient-to-br from-emerald-50 to-white",
    icon: "bg-emerald-100 text-emerald-600",
  },
  orange: {
    card: "border-orange-100 bg-gradient-to-br from-orange-50 to-white",
    icon: "bg-orange-100 text-orange-600",
  },
};

const SummaryCards = ({ total, active, completed }: SummaryCardsProps) => {
  const stats = [
    {
      title: "Total Tasks",
      value: total,
      icon: ListTodo,
      style: statStyles.blue,
    },
    {
      title: "Active Tasks",
      value: active,
      icon: CircleAlert,
      style: statStyles.orange,
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      style: statStyles.green,
    },
  ];

  return (
    <section
      aria-label="Task statistics"
      className="mb-6 grid grid-cols-2 gap-3 xl:grid-cols-3"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className={`rounded-2xl shadow-none ${stat.style.card}`}
          >
            <CardContent className="flex items-center gap-3  sm:gap-4">
              <div
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl sm:h-14 sm:w-14 ${stat.style.icon}`}
              >
                <Icon className="h-6 w-6" />
              </div>

              <div className="min-w-0">
                <p className="text-2xl font-bold leading-none text-slate-900 sm:text-3xl">
                  <AnimatedNumber value={stat.value} />
                </p>

                <p className="mt-2 truncate text-xs font-medium text-slate-600 sm:text-sm">
                  {stat.title}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
};

export default SummaryCards;
