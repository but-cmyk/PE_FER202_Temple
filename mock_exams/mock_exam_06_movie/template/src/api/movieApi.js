import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories`)
  return response.data
}

export const fetchCategoryById = async (id) => {
  const response = await axios.get(`${BASE_URL}/categories/${id}`)
  return response.data
}

export const addCategory = async (data) => {
  const response = await axios.post(`${BASE_URL}/categories`, data)
  return response.data
}

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${BASE_URL}/categories/${id}`)
  return response.data
}

export const fetchMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movies`)
  return response.data
}

export const fetchMovieById = async (id) => {
  const response = await axios.get(`${BASE_URL}/movies/${id}`)
  return response.data
}

export const addMovie = async (data) => {
  const response = await axios.post(`${BASE_URL}/movies`, data)
  return response.data
}

export const deleteMovie = async (id) => {
  const response = await axios.delete(`${BASE_URL}/movies/${id}`)
  return response.data
}
