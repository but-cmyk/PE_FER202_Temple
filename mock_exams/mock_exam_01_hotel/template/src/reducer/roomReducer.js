export const initialState = {
  loading: true,
  error: null,
  roomTypes: [],
  rooms: [],
}

export function roomReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_TYPES':
      return { ...state, roomTypes: action.payload }
    case 'SET_ITEMS':
      return { ...state, rooms: action.payload }
    case 'ADD_ITEM':
      return { ...state, rooms: [...state.rooms, action.payload] }
    case 'DELETE_ITEM':
      return {
        ...state,
        rooms: state.rooms.filter((item) => item.id !== action.payload),
      }
    case 'DELETE_TYPE':
      return {
        ...state,
        roomTypes: state.roomTypes.filter((type) => type.id !== action.payload),
      }
    case 'ADD_TYPE':
      return { ...state, roomTypes: [...state.roomTypes, action.payload] }
    default:
      return state
  }
}
