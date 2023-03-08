import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutContext)

    if (!context) {
        throw Error('useWorkoutContext must be used inside the WorkoutContextProvider.')
    }

    return context
}
