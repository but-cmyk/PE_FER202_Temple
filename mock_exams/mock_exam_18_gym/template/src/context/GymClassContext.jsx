import { createContext, useContext, useReducer, useEffect } from 'react'
import { gymClassReducer, initialState } from '../reducer/gymClassReducer'
import { fetchTrainers, fetchGymClasses } from '../api/gymClassApi'

export const GymClassContext = createContext(null)

export function GymClassProvider({ children }) {
  const [state, dispatch] = useReducer(gymClassReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchTrainers(), fetchGymClasses()]).then(
      ([typesResult, itemsResult]) => {
        if (typesResult.status === 'fulfilled')
          dispatch({ type: 'SET_TYPES', payload: typesResult.value })
        if (itemsResult.status === 'fulfilled')
          dispatch({ type: 'SET_ITEMS', payload: itemsResult.value })
        else
          dispatch({ type: 'SET_ERROR', payload: itemsResult.reason?.message })
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    )
  }, [])

  return (
    <GymClassContext.Provider value={{ state, dispatch }}>
      {children}
    </GymClassContext.Provider>
  )
}

export function useGymClass() {
  return useContext(GymClassContext)
}
