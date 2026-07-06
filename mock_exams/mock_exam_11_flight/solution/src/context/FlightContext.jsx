import { createContext, useContext, useReducer, useEffect } from 'react'
import { flightReducer, initialState } from '../reducer/flightReducer'
import { fetchAirlines, fetchFlights } from '../api/flightApi'

export const FlightContext = createContext(null)

export function FlightProvider({ children }) {
  const [state, dispatch] = useReducer(flightReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchAirlines(), fetchFlights()]).then(
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
    <FlightContext.Provider value={{ state, dispatch }}>
      {children}
    </FlightContext.Provider>
  )
}

export function useFlight() {
  return useContext(FlightContext)
}
