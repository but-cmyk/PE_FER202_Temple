import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genres`)
  return response.data
}

export const fetchGenreById = async (id) => {
  const response = await axios.get(`${BASE_URL}/genres/${id}`)
  return response.data
}

export const addGenre = async (data) => {
  const response = await axios.post(`${BASE_URL}/genres`, data)
  return response.data
}

export const deleteGenre = async (id) => {
  const response = await axios.delete(`${BASE_URL}/genres/${id}`)
  return response.data
}

export const fetchBooks = async () => {
  const response = await axios.get(`${BASE_URL}/books`)
  return response.data
}

export const fetchBookById = async (id) => {
  const response = await axios.get(`${BASE_URL}/books/${id}`)
  return response.data
}

export const addBook = async (data) => {
  const response = await axios.post(`${BASE_URL}/books`, data)
  return response.data
}

export const deleteBook = async (id) => {
  const response = await axios.delete(`${BASE_URL}/books/${id}`)
  return response.data
}
