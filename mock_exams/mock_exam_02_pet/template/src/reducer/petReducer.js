export const initialState = {
  loading: true,
  error: null,
  breeds: [],
  pets: [],
}

export function petReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_TYPES':
      return { ...state, breeds: action.payload }
    case 'SET_ITEMS':
      return { ...state, pets: action.payload }
    case 'ADD_ITEM':
      return { ...state, pets: [...state.pets, action.payload] }
    case 'DELETE_ITEM':
      return {
        ...state,
        pets: state.pets.filter((item) => item.id !== action.payload),
      }
    case 'DELETE_TYPE':
      return {
        ...state,
        breeds: state.breeds.filter((type) => type.id !== action.payload),
      }
    case 'ADD_TYPE':
      return { ...state, breeds: [...state.breeds, action.payload] }
    default:
      return state
  }
}
