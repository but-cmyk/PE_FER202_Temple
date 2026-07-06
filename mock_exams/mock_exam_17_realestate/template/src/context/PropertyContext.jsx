import { createContext, useContext, useReducer, useEffect } from 'react'
import { propertyReducer, initialState } from '../reducer/propertyReducer'
import { fetchAgents, fetchProperties } from '../api/propertyApi'

export const PropertyContext = createContext(null)

export function PropertyProvider({ children }) {
  const [state, dispatch] = useReducer(propertyReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchAgents(), fetchProperties()]).then(
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
    <PropertyContext.Provider value={{ state, dispatch }}>
      {children}
    </PropertyContext.Provider>
  )
}

export function useProperty() {
  return useContext(PropertyContext)
}
