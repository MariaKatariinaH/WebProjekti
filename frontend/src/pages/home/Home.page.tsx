import AlertCard from '../../components/homepage/AlertCard.component'
import DoneThisWeek from '../../components/homepage/DoneThisWeek.component'
import ReminderCard from '../../components/homepage/ReminderCard.component'
import TasksInProgress from '../../components/homepage/TasksInProgress.component'
import './home.scss'

const Home = () => {
  return (
    <div className='content home'> 
    <h3>Welcome To Activities and Tasks Manager</h3>
    <br />
   
    <TasksInProgress />
    
    
    <div>
      <DoneThisWeek />
    </div>
    <div>
    <h4>Reminders and announcements</h4>
    </div>
    <div>
      <AlertCard />
      </div>
      <div>
      <ReminderCard />
    </div>
    
    </div>
    
  )
}

export default Home

