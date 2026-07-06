export const initialState = {
  loading: true,
  error: null,
  companies: [],
  jobs: [],
}

export function jobReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_TYPES':
      return { ...state, companies: action.payload }
    case 'SET_ITEMS':
      return { ...state, jobs: action.payload }
    case 'ADD_ITEM':
      return { ...state, jobs: [...state.jobs, action.payload] }
    case 'DELETE_ITEM':
      return {
        ...state,
        jobs: state.jobs.filter((item) => item.id !== action.payload),
      }
    case 'DELETE_TYPE':
      return {
        ...state,
        companies: state.companies.filter((type) => type.id !== action.payload),
      }
    case 'ADD_TYPE':
      return { ...state, companies: [...state.companies, action.payload] }
    default:
      return state
  }
}
