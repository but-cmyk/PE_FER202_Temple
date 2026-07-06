import { createContext, useContext, useReducer, useEffect } from 'react'
import { songReducer, initialState } from '../reducer/songReducer'
import { fetchArtists, fetchSongs } from '../api/songApi'

export const SongContext = createContext(null)

export function SongProvider({ children }) {
  const [state, dispatch] = useReducer(songReducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetchArtists(), fetchSongs()]).then(
      ([typesResult, itemsResult]) => {
        if (typesResult.status === 'fulfilled')
          dispatch({ type: 'SET_TYPES', payload: typesResult.value })
        if (itemsResult.status === 'fulfilled')
          dispatch({ type: 'SET_ITEMS', payload: itemsResult.value })
        else
          dispatch({ type: 'SET_ERROR', payload: itemsResult.reason?.message })
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    )
  }, [])

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      {children}
    </SongContext.Provider>
  )
}

export function useSong() {
  return useContext(SongContext)
}
