import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const { dispatch } = useWorkoutsContext()

  const handleSubmit = async e => {
    e.preventDefault()
    const workout = { title, load, reps }

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // get the response from the server
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      // dispatch an action
      dispatch({ type: 'CREATE_WORKOUT', payload: json })
      console.log('New workout added!')
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Create a New Workout</h3>
      <label>Exercise Title: </label>
      <input
        type="text"
        onChange={e => {
          setTitle(e.target.value)
        }}
        value={title}
      />

      <label>Load (in kg): </label>
      <input
        type="number"
        onChange={e => {
          setLoad(e.target.value)
        }}
        value={load}
      />

      <label>Reps: </label>
      <input
        type="number"
        onChange={e => {
          setReps(e.target.value)
        }}
        value={reps}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}
export default WorkoutForm
