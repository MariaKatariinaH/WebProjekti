import { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts";
import { IMyTask } from "../../types/global.typing";

const DoneThisWeek = () => {
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

  //Maybe get the week number?
  const getWeekNumber = (d: Date): number => {
    const oneJan = new Date(d.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((d.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
    return weekNumber;
  };

  const getMyTasksThisWeek = (mytasks: IMyTask[]) => {
    const currentDate = new Date();
    const currentWeek = getWeekNumber(currentDate);
    const currentYear = currentDate.getFullYear();

    return mytasks.filter((mytask) => {
      const updatedAtDate = new Date(mytask.updatedAt);
      const taskWeek = getWeekNumber(updatedAtDate)
      const taskYear = updatedAtDate.getFullYear();
      return (
        mytask.status === "Done" &&
        taskWeek === currentWeek &&
        taskYear === currentYear
      );
    });
  };

  

  const mytasksThisWeek = getMyTasksThisWeek(mytasks);
  
  const groupMyTasksByStatus = (mytasks: IMyTask[]) => {
    let doneCount = 0;

    mytasks.forEach((mytask) => {
      if (mytask.status === "Done") {
        doneCount += 1;
      }
    });

    return { done: doneCount };
  };

  const statusCounts = groupMyTasksByStatus(mytasksThisWeek);
  
  const uData = [statusCounts.done];

  const xLabels = ["Done"];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div className="content">
      <span>Tasks done this week.</span>
      <BarChart
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

export default DoneThisWeek;