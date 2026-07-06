export const initialState = {
  loading: true,
  error: null,
  trainers: [],
  gymClasses: [],
}

export function gymClassReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_TYPES':
      return { ...state, trainers: action.payload }
    case 'SET_ITEMS':
      return { ...state, gymClasses: action.payload }
    case 'ADD_ITEM':
      return { ...state, gymClasses: [...state.gymClasses, action.payload] }
    case 'DELETE_ITEM':
      return {
        ...state,
        gymClasses: state.gymClasses.filter((item) => item.id !== action.payload),
      }
    case 'DELETE_TYPE':
      return {
        ...state,
        trainers: state.trainers.filter((type) => type.id !== action.payload),
      }
    case 'ADD_TYPE':
      return { ...state, trainers: [...state.trainers, action.payload] }
    default:
      return state
  }
}
