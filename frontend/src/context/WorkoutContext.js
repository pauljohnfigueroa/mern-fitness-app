import { createContext, useReducer } from "react";

export const WorkoutContext = createContext({})

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return { workouts: action.payload }
        case 'CREATE_WORKOUT':
            // action.payload is the new workout added, 
            // then include the old list of workouts (...state.workouts)
            return { workouts: [action.payload, ...state.workouts] }
        case 'DELETE_WORKOUT':
            return { workouts: state.workouts.filter((workout) => workout._id !== action.payload._id) }
        // if nothing matched, we return the state unchanged.
        default: return state
    }
}

export const WorkoutContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })

    const values = { ...state, dispatch }

    return <WorkoutContext.Provider value={values}>{children}</WorkoutContext.Provider>
}