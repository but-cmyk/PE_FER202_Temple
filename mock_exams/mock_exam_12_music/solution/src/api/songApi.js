import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchArtists = async () => {
  const response = await axios.get(`${BASE_URL}/artists`)
  return response.data
}

export const fetchArtistById = async (id) => {
  const response = await axios.get(`${BASE_URL}/artists/${id}`)
  return response.data
}

export const addArtist = async (data) => {
  const response = await axios.post(`${BASE_URL}/artists`, data)
  return response.data
}

export const deleteArtist = async (id) => {
  const response = await axios.delete(`${BASE_URL}/artists/${id}`)
  return response.data
}

export const fetchSongs = async () => {
  const response = await axios.get(`${BASE_URL}/songs`)
  return response.data
}

export const fetchSongById = async (id) => {
  const response = await axios.get(`${BASE_URL}/songs/${id}`)
  return response.data
}

export const addSong = async (data) => {
  const response = await axios.post(`${BASE_URL}/songs`, data)
  return response.data
}

export const deleteSong = async (id) => {
  const response = await axios.delete(`${BASE_URL}/songs/${id}`)
  return response.data
}
