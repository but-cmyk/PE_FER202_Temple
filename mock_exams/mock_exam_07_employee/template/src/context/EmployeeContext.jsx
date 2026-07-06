import { createContext, useContext, useReducer, useEffect } from 'react'
import { employeeReducer, initialState } from '../reducer/employeeReducer'
import { fetchDepartments, fetchEmployees } from '../api/employeeApi'

export const EmployeeContext = createContext(null)

export function EmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(employeeReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchDepartments(), fetchEmployees()]).then(
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
    <EmployeeContext.Provider value={{ state, dispatch }}>
      {children}
    </EmployeeContext.Provider>
  )
}

export function useEmployee() {
  return useContext(EmployeeContext)
}
