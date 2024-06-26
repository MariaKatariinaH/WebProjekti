import { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts";
import { IMyTask } from "../../types/global.typing";

const TasksInProgress = () => {
  const [mytasks, setMyTasks] = useState<IMyTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    const fetchMyTasks = async () => {
      const response = await fetch("http://localhost:5004/api/MyTask/Get");
      const data = await response.json();
      setMyTasks(data);
      setLoading(false);
    };
    fetchMyTasks();
  }, []);

  const groupMyTasksByStatus = (mytasks: IMyTask[]) => {
    const statusCounts: { [key: string]: number } = {
      new: 0,
      inprogress: 0,
      done: 0,
      notdoingit: 0,
    };
    mytasks.forEach((mytask) => {
      if (mytask.status) {
        statusCounts[mytask.status.toLowerCase()] += 1;
      }
    });
    return statusCounts;
  };

  const statusCounts = groupMyTasksByStatus(mytasks);

  const uData = [statusCounts.inprogress];

  const xLabels = ["In Progress"];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div className="content">
      <span>Your tasks at the moment</span>
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
          { data: uData, label: "Count", type: "bar", color: "#8b008b" },
        ]}
        xAxis={[{ scaleType: "band", data: xLabels }]}
      ></BarChart>
    </div>
  );
};

export default TasksInProgress;
