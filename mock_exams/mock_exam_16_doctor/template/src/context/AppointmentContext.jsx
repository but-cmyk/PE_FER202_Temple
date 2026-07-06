import { createContext, useContext, useReducer, useEffect } from 'react'
import { appointmentReducer, initialState } from '../reducer/appointmentReducer'
import { fetchDoctors, fetchAppointments } from '../api/appointmentApi'

export const AppointmentContext = createContext(null)

export function AppointmentProvider({ children }) {
  const [state, dispatch] = useReducer(appointmentReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchDoctors(), fetchAppointments()]).then(
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
    <AppointmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AppointmentContext.Provider>
  )
}

export function useAppointment() {
  return useContext(AppointmentContext)
}
