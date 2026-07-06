export const initialState = {
  loading: true,
  error: null,
  cuisines: [],
  recipes: [],
}

export function recipeReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_TYPES':
      return { ...state, cuisines: action.payload }
    case 'SET_ITEMS':
      return { ...state, recipes: action.payload }
    case 'ADD_ITEM':
      return { ...state, recipes: [...state.recipes, action.payload] }
    case 'DELETE_ITEM':
      return {
        ...state,
        recipes: state.recipes.filter((item) => item.id !== action.payload),
      }
    case 'DELETE_TYPE':
      return {
        ...state,
        cuisines: state.cuisines.filter((type) => type.id !== action.payload),
      }
    case 'ADD_TYPE':
      return { ...state, cuisines: [...state.cuisines, action.payload] }
    default:
      return state
  }
}
