import { createContext, useContext, useReducer, useEffect } from 'react'
import { gigReducer, initialState } from '../reducer/gigReducer'
import { fetchCategories, fetchGigs } from '../api/gigApi'

export const GigContext = createContext(null)

export function GigProvider({ children }) {
  const [state, dispatch] = useReducer(gigReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchCategories(), fetchGigs()]).then(
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
    <GigContext.Provider value={{ state, dispatch }}>
      {children}
    </GigContext.Provider>
  )
}

export function useGig() {
  return useContext(GigContext)
}
