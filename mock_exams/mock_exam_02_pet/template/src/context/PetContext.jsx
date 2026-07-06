import { createContext, useContext, useReducer, useEffect } from 'react'
import { petReducer, initialState } from '../reducer/petReducer'
import { fetchBreeds, fetchPets } from '../api/petApi'

export const PetContext = createContext(null)

export function PetProvider({ children }) {
  const [state, dispatch] = useReducer(petReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchBreeds(), fetchPets()]).then(
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
    <PetContext.Provider value={{ state, dispatch }}>
      {children}
    </PetContext.Provider>
  )
}

export function usePet() {
  return useContext(PetContext)
}
