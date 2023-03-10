import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()

    const logout = () => {
        // remove token from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })

        // clear the workouts state after logout
        // this resolves the flashing of the 
        // previous workouts state when a different user logs in
        workoutsDispatch({ type: 'SET_WORKOUTS', payload: null })
    }
    return { logout }
}