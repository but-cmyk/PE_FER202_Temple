import { createContext, useContext, useReducer, useEffect } from 'react'
import { productReducer, initialState } from '../reducer/productReducer'
import { fetchBrands, fetchProducts } from '../api/productApi'

export const ProductContext = createContext(null)

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchBrands(), fetchProducts()]).then(
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
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProduct() {
  return useContext(ProductContext)
}
