import React from 'react';
import { useState, useEffect } from 'react';
import { ChartContainer, BarPlot } from '@mui/x-charts';
import { IActivity } from '../../types/global.typing';

const Statistics = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      
        const response = await fetch('http://localhost:5004/api/Activity/Get'); 
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

  const xLabels = ['New', 'In Progress', 'Done', 'Not Doing'];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div className='content statistics'> 
      
      <br />
      <span>
          Be proud of your progress.
      </span>
      <br />
      <br />
      <ChartContainer
        width={500}
        height={300}
        series={[{ data: uData, label: 'Count', type: 'bar', color: '#0ea4df' }]}
        xAxis={[{ scaleType: 'band', data: xLabels }]}
      >
        <BarPlot />
      </ChartContainer>
    </div>
  );
};

export default Statistics;