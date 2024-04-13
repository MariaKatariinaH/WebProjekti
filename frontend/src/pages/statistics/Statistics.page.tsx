import StatisticsBarChart from "../../components/statistics/StatisticsBarChart.component";

const Statistics = () => {
  return (
    <div className="content statistics">
      <h3>See Your Progress</h3>
      <br />
      <br />

      <div>
        <StatisticsBarChart />
      </div>
    </div>
  );
};

export default Statistics;
