export const initialState = {
  loading: true,
  error: null,
  artists: [],
  songs: [],
}

export function songReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_TYPES':
      return { ...state, artists: action.payload }
    case 'SET_ITEMS':
      return { ...state, songs: action.payload }
    case 'ADD_ITEM':
      return { ...state, songs: [...state.songs, action.payload] }
    case 'DELETE_ITEM':
      return {
        ...state,
        songs: state.songs.filter((item) => item.id !== action.payload),
      }
    case 'DELETE_TYPE':
      return {
        ...state,
        artists: state.artists.filter((type) => type.id !== action.payload),
      }
    case 'ADD_TYPE':
      return { ...state, artists: [...state.artists, action.payload] }
    default:
      return state
  }
}
