import { createContext, useContext, useReducer, useEffect } from 'react'
import { movieReducer, initialState } from '../reducer/movieReducer'
import { fetchCategories, fetchMovies } from '../api/movieApi'

export const MovieContext = createContext(null)

export function MovieProvider({ children }) {
  const [state, dispatch] = useReducer(movieReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchCategories(), fetchMovies()]).then(
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
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  )
}

export function useMovie() {
  return useContext(MovieContext)
}
