import { createContext, useContext, useReducer, useEffect } from 'react'
import { recipeReducer, initialState } from '../reducer/recipeReducer'
import { fetchCuisines, fetchRecipes } from '../api/recipeApi'

export const RecipeContext = createContext(null)

export function RecipeProvider({ children }) {
  const [state, dispatch] = useReducer(recipeReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchCuisines(), fetchRecipes()]).then(
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
    <RecipeContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  )
}

export function useRecipe() {
  return useContext(RecipeContext)
}
