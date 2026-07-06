export const initialState = {
  loading: true,
  error: null,
  airlines: [],
  flights: [],
}

export function flightReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_TYPES':
      return { ...state, airlines: action.payload }
    case 'SET_ITEMS':
      return { ...state, flights: action.payload }
    case 'ADD_ITEM':
      return { ...state, flights: [...state.flights, action.payload] }
    case 'DELETE_ITEM':
      return {
        ...state,
        flights: state.flights.filter((item) => item.id !== action.payload),
      }
    case 'DELETE_TYPE':
      return {
        ...state,
        airlines: state.airlines.filter((type) => type.id !== action.payload),
      }
    case 'ADD_TYPE':
      return { ...state, airlines: [...state.airlines, action.payload] }
    default:
      return state
  }
}
