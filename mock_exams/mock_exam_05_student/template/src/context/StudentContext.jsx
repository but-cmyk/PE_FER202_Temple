import { createContext, useContext, useReducer, useEffect } from 'react'
import { studentReducer, initialState } from '../reducer/studentReducer'
import { fetchDepartments, fetchStudents } from '../api/studentApi'

export const StudentContext = createContext(null)

export function StudentProvider({ children }) {
  const [state, dispatch] = useReducer(studentReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchDepartments(), fetchStudents()]).then(
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
    <StudentContext.Provider value={{ state, dispatch }}>
      {children}
    </StudentContext.Provider>
  )
}

export function useStudent() {
  return useContext(StudentContext)
}
