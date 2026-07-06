import { createContext, useContext, useReducer, useEffect } from 'react'
import { carReducer, initialState } from '../reducer/carReducer'
import { fetchDealers, fetchCars } from '../api/carApi'

export const CarContext = createContext(null)

export function CarProvider({ children }) {
  const [state, dispatch] = useReducer(carReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchDealers(), fetchCars()]).then(
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
    <CarContext.Provider value={{ state, dispatch }}>
      {children}
    </CarContext.Provider>
  )
}

export function useCar() {
  return useContext(CarContext)
}
