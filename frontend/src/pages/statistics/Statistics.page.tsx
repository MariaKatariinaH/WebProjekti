import StatisticsBarChart from "../../components/statistics/StatisticsBarChart.component";
import DoneThisMonth from "../../components/statistics/DoneThisMonth.component";
import StatisticsTasks from "../../components/statistics/TasksBarChart.component";
import TasksThisMonth from "../../components/statistics/TasksThisMonth.component";

const Statistics = () => {
  return (
    <div className="content statistics">
      <h3>Activities according to their status</h3>
      <div>
        <StatisticsBarChart />
      </div>
      <br/>
      <h3>Activities: Done in this month</h3>
      <div>
        <DoneThisMonth />
      </div>
      <br/>
      <h3>Tasks according to their status</h3>
      <div>
        <StatisticsTasks />
      </div>
      <br/>
      <h3>Tasks: Done in this month</h3>
      <div>
        <TasksThisMonth />
      </div>
    </div>
  );
};

export default Statistics;
