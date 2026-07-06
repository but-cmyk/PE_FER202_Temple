export const initialState = {
  loading: true,
  error: null,
  doctors: [],
  appointments: [],
}

export function appointmentReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_TYPES':
      return { ...state, doctors: action.payload }
    case 'SET_ITEMS':
      return { ...state, appointments: action.payload }
    case 'ADD_ITEM':
      return { ...state, appointments: [...state.appointments, action.payload] }
    case 'DELETE_ITEM':
      return {
        ...state,
        appointments: state.appointments.filter((item) => item.id !== action.payload),
      }
    case 'DELETE_TYPE':
      return {
        ...state,
        doctors: state.doctors.filter((type) => type.id !== action.payload),
      }
    case 'ADD_TYPE':
      return { ...state, doctors: [...state.doctors, action.payload] }
    default:
      return state
  }
}
