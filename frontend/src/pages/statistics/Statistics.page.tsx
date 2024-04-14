import StatisticsBarChart from "../../components/statistics/StatisticsBarChart.component";
import DoneThisMonth from "../../components/statistics/DoneThisMonth.component";

const Statistics = () => {
  return (
    <div className="content statistics">
      <h3>Activities according to their status</h3>
      <br />
      <div>
        <StatisticsBarChart />
      </div>
      <h3>Activities: Done in this month</h3>
      <br />
      <div>
        <DoneThisMonth />
      </div>
      <h3>Tasks according to their status</h3>
      <br />
      <div></div>
    </div>
  );
};

export default Statistics;
