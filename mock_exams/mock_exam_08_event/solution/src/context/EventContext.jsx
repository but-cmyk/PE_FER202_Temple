import { createContext, useContext, useReducer, useEffect } from 'react'
import { eventReducer, initialState } from '../reducer/eventReducer'
import { fetchLocations, fetchEvents } from '../api/eventApi'

export const EventContext = createContext(null)

export function EventProvider({ children }) {
  const [state, dispatch] = useReducer(eventReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchLocations(), fetchEvents()]).then(
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
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  )
}

export function useEvent() {
  return useContext(EventContext)
}
