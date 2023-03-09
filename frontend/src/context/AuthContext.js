import { useReducer, createContext } from 'react'

export const AuthContext = createContext()

export const usersReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            // payload is the {email, token}
            return { user: action.payload }
        case 'LOGOUT':
            // no token will logout the user
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(usersReducer, {
        user: null
    })

    const values = { ...state, dispatch }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}