export const initialState = {
  loading: true,
  error: null,
  agents: [],
  properties: [],
}

export function propertyReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_TYPES':
      return { ...state, agents: action.payload }
    case 'SET_ITEMS':
      return { ...state, properties: action.payload }
    case 'ADD_ITEM':
      return { ...state, properties: [...state.properties, action.payload] }
    case 'DELETE_ITEM':
      return {
        ...state,
        properties: state.properties.filter((item) => item.id !== action.payload),
      }
    case 'DELETE_TYPE':
      return {
        ...state,
        agents: state.agents.filter((type) => type.id !== action.payload),
      }
    case 'ADD_TYPE':
      return { ...state, agents: [...state.agents, action.payload] }
    default:
      return state
  }
}
