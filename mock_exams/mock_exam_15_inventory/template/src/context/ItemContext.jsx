import { createContext, useContext, useReducer, useEffect } from 'react'
import { itemReducer, initialState } from '../reducer/itemReducer'
import { fetchSuppliers, fetchItems } from '../api/itemApi'

export const ItemContext = createContext(null)

export function ItemProvider({ children }) {
  const [state, dispatch] = useReducer(itemReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchSuppliers(), fetchItems()]).then(
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
    <ItemContext.Provider value={{ state, dispatch }}>
      {children}
    </ItemContext.Provider>
  )
}

export function useItem() {
  return useContext(ItemContext)
}
