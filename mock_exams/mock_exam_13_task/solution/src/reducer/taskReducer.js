export const initialState = {
  loading: true,
  error: null,
  projects: [],
  tasks: [],
}

export function taskReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_TYPES':
      return { ...state, projects: action.payload }
    case 'SET_ITEMS':
      return { ...state, tasks: action.payload }
    case 'ADD_ITEM':
      return { ...state, tasks: [...state.tasks, action.payload] }
    case 'DELETE_ITEM':
      return {
        ...state,
        tasks: state.tasks.filter((item) => item.id !== action.payload),
      }
    case 'DELETE_TYPE':
      return {
        ...state,
        projects: state.projects.filter((type) => type.id !== action.payload),
      }
    case 'ADD_TYPE':
      return { ...state, projects: [...state.projects, action.payload] }
    default:
      return state
  }
}
