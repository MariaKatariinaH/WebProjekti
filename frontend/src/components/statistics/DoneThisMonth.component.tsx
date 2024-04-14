import './statistics-chart.scss'
import { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts';
import { IActivity } from '../../types/global.typing';

const DoneThisMonth = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://localhost:5004/api/Activity/Get'); 
        const data = await response.json();
        setActivities(data);
        setLoading(false);
      } catch (err: any) {
        setError(err as Error);
        setLoading(false);
      }
    };
    
    fetchActivities();
  }, []);

  const getActivitiesDoneThisMonth = (activities: IActivity[]) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return activities.filter((activity) => {
      const updatedAtDate = new Date(activity.updatedAt);
      return activity.status === 'Done' &&
             updatedAtDate.getMonth() === currentMonth &&
             updatedAtDate.getFullYear() === currentYear;
    });
  };

  const activitiesDoneThisMonth = getActivitiesDoneThisMonth(activities);
  console.log('activitiesDoneThisMonth:', activitiesDoneThisMonth);

  const groupActivitiesByStatus = (activities: IActivity[]) => {
    let doneCount = 0;

    activities.forEach((activity) => {
      if (activity.status === 'Done') {
        doneCount += 1;
      }
    });

    return { done: doneCount };
  };

  const statusCounts = groupActivitiesByStatus(activitiesDoneThisMonth);
  console.log('statusCounts:', statusCounts);

  const uData = [
    statusCounts.done,
  ];

  const xLabels = ['Done'];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div className='content statistics-this-month'> 
      <span>
          Be proud of your progress this month.
      </span>
      <br />
      <br />
      <BarChart
        width={500}
        height={300}
        series={[{ data: uData, label: 'Count', type: 'bar', color:'#ff1493' }]}
        xAxis={[{ scaleType: 'band', data: xLabels }]}
      />
    </div>
  );
};

export default DoneThisMonth;