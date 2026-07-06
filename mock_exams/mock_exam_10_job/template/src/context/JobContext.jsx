import { createContext, useContext, useReducer, useEffect } from 'react'
import { jobReducer, initialState } from '../reducer/jobReducer'
import { fetchCompanies, fetchJobs } from '../api/jobApi'

export const JobContext = createContext(null)

export function JobProvider({ children }) {
  const [state, dispatch] = useReducer(jobReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchCompanies(), fetchJobs()]).then(
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
    <JobContext.Provider value={{ state, dispatch }}>
      {children}
    </JobContext.Provider>
  )
}

export function useJob() {
  return useContext(JobContext)
}
