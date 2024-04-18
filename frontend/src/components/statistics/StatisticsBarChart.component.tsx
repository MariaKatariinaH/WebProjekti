import "./statistics-chart.scss";
import { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts";
import { IActivity } from "../../types/global.typing";

const Statistics = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch("http://localhost:5004/api/Activity/Get");
      const data = await response.json();
      setActivities(data);
      setLoading(false);
    };
    fetchActivities();
  }, []);

  const groupActivitiesByStatus = (activities: IActivity[]) => {
    const statusCounts: { [key: string]: number } = {
      new: 0,
      inprogress: 0,
      done: 0,
      notdoingit: 0,
    };
    activities.forEach((activity) => {
      if (activity.status) {
        statusCounts[activity.status.toLowerCase()] += 1;
      }
    });
    return statusCounts;
  };

  const statusCounts = groupActivitiesByStatus(activities);

  const uData = [
    statusCounts.new,
    statusCounts.inprogress,
    statusCounts.done,
    statusCounts.notdoingit,
  ];

  const xLabels = ["New", "In Progress", "Done", "Not Doing It"];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div className="content">
      <span>Be proud of your progress.</span>
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
          { data: uData, label: "Count", type: "bar", color: "#0ea4df" },
        ]}
        xAxis={[{ scaleType: "band", data: xLabels }]}
      ></BarChart>
    </div>
  );
};

export default Statistics;
