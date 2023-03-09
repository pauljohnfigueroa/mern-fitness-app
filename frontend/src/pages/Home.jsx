import { useEffect } from 'react'

import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useAuthContext } from '../hooks/useAuthContext'

const Home = () => {
  // const [workouts, setWorkouts] = useState(null)

  // workouts here is from the switch statement in the reducer function
  const { workouts, dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })

      const json = await response.json()
      if (response.ok) {
        //setWorkouts(json)
        // this will invoke the reducer function in WorkoutContextProvider
        dispatch({ type: 'SET_WORKOUTS', payload: json })
      }
    }
    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])

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
