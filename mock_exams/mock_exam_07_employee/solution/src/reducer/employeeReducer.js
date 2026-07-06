export const initialState = {
  loading: true,
  error: null,
  departments: [],
  employees: [],
}

export function employeeReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_TYPES':
      return { ...state, departments: action.payload }
    case 'SET_ITEMS':
      return { ...state, employees: action.payload }
    case 'ADD_ITEM':
      return { ...state, employees: [...state.employees, action.payload] }
    case 'DELETE_ITEM':
      return {
        ...state,
        employees: state.employees.filter((item) => item.id !== action.payload),
      }
    case 'DELETE_TYPE':
      return {
        ...state,
        departments: state.departments.filter((type) => type.id !== action.payload),
      }
    case 'ADD_TYPE':
      return { ...state, departments: [...state.departments, action.payload] }
    default:
      return state
  }
}
