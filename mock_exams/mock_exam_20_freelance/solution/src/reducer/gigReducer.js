export const initialState = {
  loading: true,
  error: null,
  categories: [],
  gigs: [],
}

export function gigReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_TYPES':
      return { ...state, categories: action.payload }
    case 'SET_ITEMS':
      return { ...state, gigs: action.payload }
    case 'ADD_ITEM':
      return { ...state, gigs: [...state.gigs, action.payload] }
    case 'DELETE_ITEM':
      return {
        ...state,
        gigs: state.gigs.filter((item) => item.id !== action.payload),
      }
    case 'DELETE_TYPE':
      return {
        ...state,
        categories: state.categories.filter((type) => type.id !== action.payload),
      }
    case 'ADD_TYPE':
      return { ...state, categories: [...state.categories, action.payload] }
    default:
      return state
  }
}
