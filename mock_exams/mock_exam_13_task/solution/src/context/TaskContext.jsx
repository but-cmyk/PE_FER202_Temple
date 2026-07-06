import { createContext, useContext, useReducer, useEffect } from 'react'
import { taskReducer, initialState } from '../reducer/taskReducer'
import { fetchProjects, fetchTasks } from '../api/taskApi'

export const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchProjects(), fetchTasks()]).then(
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
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTask() {
  return useContext(TaskContext)
}
