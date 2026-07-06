import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchCuisines = async () => {
  const response = await axios.get(`${BASE_URL}/cuisines`)
  return response.data
}

export const fetchCuisineById = async (id) => {
  const response = await axios.get(`${BASE_URL}/cuisines/${id}`)
  return response.data
}

export const addCuisine = async (data) => {
  const response = await axios.post(`${BASE_URL}/cuisines`, data)
  return response.data
}

export const deleteCuisine = async (id) => {
  const response = await axios.delete(`${BASE_URL}/cuisines/${id}`)
  return response.data
}

export const fetchRecipes = async () => {
  const response = await axios.get(`${BASE_URL}/recipes`)
  return response.data
}

export const fetchRecipeById = async (id) => {
  const response = await axios.get(`${BASE_URL}/recipes/${id}`)
  return response.data
}

export const addRecipe = async (data) => {
  const response = await axios.post(`${BASE_URL}/recipes`, data)
  return response.data
}

export const deleteRecipe = async (id) => {
  const response = await axios.delete(`${BASE_URL}/recipes/${id}`)
  return response.data
}
