import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const handleSubmit = async e => {
    e.preventDefault()

    if (!user) {
      setError('Authorization required.')
      return
    }

    const workout = { title, load, reps }

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    })

    // get the response from the server
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      setEmptyFields([])
      // dispatch an action, payload is the new workout we are adding (json)
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
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg): </label>
      <input
        type="number"
        onChange={e => {
          setLoad(e.target.value)
        }}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Reps: </label>
      <input
        type="number"
        onChange={e => {
          setReps(e.target.value)
        }}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>

      {error && <div className="error">{error}</div>}
    </form>
  )
}
export default WorkoutForm
