import { createContext, useContext, useReducer, useEffect } from 'react'
import { bookReducer, initialState } from '../reducer/bookReducer'
import { fetchGenres, fetchBooks } from '../api/bookApi'

export const BookContext = createContext(null)

export function BookProvider({ children }) {
  const [state, dispatch] = useReducer(bookReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchGenres(), fetchBooks()]).then(
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
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  )
}

export function useBook() {
  return useContext(BookContext)
}
