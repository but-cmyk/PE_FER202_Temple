export const initialState = {
  loading: true,
  error: null,
  modules: [],
  lessons: [],
}

export function lessonReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_TYPES':
      return { ...state, modules: action.payload }
    case 'SET_ITEMS':
      return { ...state, lessons: action.payload }
    case 'ADD_ITEM':
      return { ...state, lessons: [...state.lessons, action.payload] }
    case 'DELETE_ITEM':
      return {
        ...state,
        lessons: state.lessons.filter((item) => item.id !== action.payload),
      }
    case 'DELETE_TYPE':
      return {
        ...state,
        modules: state.modules.filter((type) => type.id !== action.payload),
      }
    case 'ADD_TYPE':
      return { ...state, modules: [...state.modules, action.payload] }
    default:
      return state
  }
}
