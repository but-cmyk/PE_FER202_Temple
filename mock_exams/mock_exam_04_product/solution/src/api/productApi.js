import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchBrands = async () => {
  const response = await axios.get(`${BASE_URL}/brands`)
  return response.data
}

export const fetchBrandById = async (id) => {
  const response = await axios.get(`${BASE_URL}/brands/${id}`)
  return response.data
}

export const addBrand = async (data) => {
  const response = await axios.post(`${BASE_URL}/brands`, data)
  return response.data
}

export const deleteBrand = async (id) => {
  const response = await axios.delete(`${BASE_URL}/brands/${id}`)
  return response.data
}

export const fetchProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`)
  return response.data
}

export const fetchProductById = async (id) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`)
  return response.data
}

export const addProduct = async (data) => {
  const response = await axios.post(`${BASE_URL}/products`, data)
  return response.data
}

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${BASE_URL}/products/${id}`)
  return response.data
}
