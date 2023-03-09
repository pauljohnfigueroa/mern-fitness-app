import { useEffect } from 'react'

import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  // const [workouts, setWorkouts] = useState(null)

  // workouts here is from the switch statement in the reducer function
  const { workouts, dispatch } = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts')
      const json = await response.json()
      if (response.ok) {
        //setWorkouts(json)
        // this will invoke the reducer function in WorkoutContextProvider
        dispatch({ type: 'SET_WORKOUTS', payload: json })
      }
    }
    fetchWorkouts()
  }, [dispatch])

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map(workout => <WorkoutDetails key={workout._id} workout={workout} />)}
      </div>
      <div>
        <WorkoutForm />
      </div>
    </div>
  )
}
export default Home
