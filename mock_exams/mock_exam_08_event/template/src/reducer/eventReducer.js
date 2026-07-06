export const initialState = {
  loading: true,
  error: null,
  locations: [],
  events: [],
}

export function eventReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_TYPES':
      return { ...state, locations: action.payload }
    case 'SET_ITEMS':
      return { ...state, events: action.payload }
    case 'ADD_ITEM':
      return { ...state, events: [...state.events, action.payload] }
    case 'DELETE_ITEM':
      return {
        ...state,
        events: state.events.filter((item) => item.id !== action.payload),
      }
    case 'DELETE_TYPE':
      return {
        ...state,
        locations: state.locations.filter((type) => type.id !== action.payload),
      }
    case 'ADD_TYPE':
      return { ...state, locations: [...state.locations, action.payload] }
    default:
      return state
  }
}
