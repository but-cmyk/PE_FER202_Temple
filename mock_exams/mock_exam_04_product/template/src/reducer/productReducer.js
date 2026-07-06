export const initialState = {
  loading: true,
  error: null,
  brands: [],
  products: [],
}

export function productReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_TYPES':
      return { ...state, brands: action.payload }
    case 'SET_ITEMS':
      return { ...state, products: action.payload }
    case 'ADD_ITEM':
      return { ...state, products: [...state.products, action.payload] }
    case 'DELETE_ITEM':
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
      }
    case 'DELETE_TYPE':
      return {
        ...state,
        brands: state.brands.filter((type) => type.id !== action.payload),
      }
    case 'ADD_TYPE':
      return { ...state, brands: [...state.brands, action.payload] }
    default:
      return state
  }
}
