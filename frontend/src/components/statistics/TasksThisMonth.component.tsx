import "./statistics-chart.scss";
import { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts";
import { IMyTask } from "../../types/global.typing";

const TasksThisMonth = () => {
  const [mytasks, setMyTasks] = useState<IMyTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMyTasks = async () => {
      try {
        const response = await fetch("http://localhost:5004/api/MyTask/Get");
        const data = await response.json();
        setMyTasks(data);
        setLoading(false);
      } catch (err: any) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchMyTasks();
  }, []);

  const getMyTasksThisMonth = (mytasks: IMyTask[]) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return mytasks.filter((mytask) => {
      const updatedAtDate = new Date(mytask.updatedAt);
      return (
        mytask.status === "Done" &&
        updatedAtDate.getMonth() === currentMonth &&
        updatedAtDate.getFullYear() === currentYear
      );
    });
  };

  const mytasksThisMonth = getMyTasksThisMonth(mytasks);

  const groupMyTasksByStatus = (mytasks: IMyTask[]) => {
    let doneCount = 0;

    mytasks.forEach((mytask) => {
      if (mytask.status === "Done") {
        doneCount += 1;
      }
    });

    return { done: doneCount };
  };

  const statusCounts = groupMyTasksByStatus(mytasksThisMonth);

  const uData = [statusCounts.done];

  const xLabels = ["Done"];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div className="content">
      <span>Be proud of your progress this month.</span>
      <BarChart
        sx={{
          // left yAxis label styles
          "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
            strokeWidth: "0.4",
            fill: "#FF0099",
          },
          // bottom label styles
          "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
            strokeWidth: "0.5",
            fill: "#FF0099",
          },
          // Bottom axis line styles
          "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
            stroke: "#FF0099",
            strokeWidth: 0.4,
          },
          // Left axis line styles
          "& .MuiChartsAxis-left .MuiChartsAxis-line": {
            stroke: "#FF0099",
            strokeWidth: 0.4,
          },
        }}
        width={500}
        height={300}
        series={[
          { data: uData, label: "Count", type: "bar", color: "#ff8c00" },
        ]}
        xAxis={[{ scaleType: "band", data: xLabels }]}
      />
    </div>
  );
};

export default TasksThisMonth;
