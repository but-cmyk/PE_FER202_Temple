export const initialState = {
  loading: true,
  error: null,
  suppliers: [],
  items: [],
}

export function itemReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_TYPES':
      return { ...state, suppliers: action.payload }
    case 'SET_ITEMS':
      return { ...state, items: action.payload }
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] }
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }
    case 'DELETE_TYPE':
      return {
        ...state,
        suppliers: state.suppliers.filter((type) => type.id !== action.payload),
      }
    case 'ADD_TYPE':
      return { ...state, suppliers: [...state.suppliers, action.payload] }
    default:
      return state
  }
}
