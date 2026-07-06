export const initialState = {
  loading: true,
  error: null,
  dealers: [],
  cars: [],
}

export function carReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_TYPES':
      return { ...state, dealers: action.payload }
    case 'SET_ITEMS':
      return { ...state, cars: action.payload }
    case 'ADD_ITEM':
      return { ...state, cars: [...state.cars, action.payload] }
    case 'DELETE_ITEM':
      return {
        ...state,
        cars: state.cars.filter((item) => item.id !== action.payload),
      }
    case 'DELETE_TYPE':
      return {
        ...state,
        dealers: state.dealers.filter((type) => type.id !== action.payload),
      }
    case 'ADD_TYPE':
      return { ...state, dealers: [...state.dealers, action.payload] }
    default:
      return state
  }
}
