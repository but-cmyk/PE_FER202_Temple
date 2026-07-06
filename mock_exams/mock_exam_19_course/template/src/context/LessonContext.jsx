import { createContext, useContext, useReducer, useEffect } from 'react'
import { lessonReducer, initialState } from '../reducer/lessonReducer'
import { fetchModules, fetchLessons } from '../api/lessonApi'

export const LessonContext = createContext(null)

export function LessonProvider({ children }) {
  const [state, dispatch] = useReducer(lessonReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchModules(), fetchLessons()]).then(
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
    <LessonContext.Provider value={{ state, dispatch }}>
      {children}
    </LessonContext.Provider>
  )
}

export function useLesson() {
  return useContext(LessonContext)
}
