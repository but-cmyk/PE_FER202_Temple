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

export const fetchGigs = async () => {
  const response = await axios.get(`${BASE_URL}/gigs`)
  return response.data
}

export const fetchGigById = async (id) => {
  const response = await axios.get(`${BASE_URL}/gigs/${id}`)
  return response.data
}

export const addGig = async (data) => {
  const response = await axios.post(`${BASE_URL}/gigs`, data)
  return response.data
}

export const deleteGig = async (id) => {
  const response = await axios.delete(`${BASE_URL}/gigs/${id}`)
  return response.data
}
