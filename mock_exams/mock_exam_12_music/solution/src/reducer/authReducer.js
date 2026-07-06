export const loginInitialState = {
  username: '',
  password: '',
  validated: false,
  serverError: '',
}

export function loginReducer(state, action) {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload }
    case 'SET_PASSWORD':
      return { ...state, password: action.payload }
    case 'SET_VALIDATED':
      return { ...state, validated: action.payload }
    case 'SET_ERROR':
      return { ...state, serverError: action.payload, validated: false }
    case 'CANCEL':
      return loginInitialState
    default:
      return state
  }
}
