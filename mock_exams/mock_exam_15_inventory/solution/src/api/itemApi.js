import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchSuppliers = async () => {
  const response = await axios.get(`${BASE_URL}/suppliers`)
  return response.data
}

export const fetchSupplierById = async (id) => {
  const response = await axios.get(`${BASE_URL}/suppliers/${id}`)
  return response.data
}

export const addSupplier = async (data) => {
  const response = await axios.post(`${BASE_URL}/suppliers`, data)
  return response.data
}

export const deleteSupplier = async (id) => {
  const response = await axios.delete(`${BASE_URL}/suppliers/${id}`)
  return response.data
}

export const fetchItems = async () => {
  const response = await axios.get(`${BASE_URL}/items`)
  return response.data
}

export const fetchItemById = async (id) => {
  const response = await axios.get(`${BASE_URL}/items/${id}`)
  return response.data
}

export const addItem = async (data) => {
  const response = await axios.post(`${BASE_URL}/items`, data)
  return response.data
}

export const deleteItem = async (id) => {
  const response = await axios.delete(`${BASE_URL}/items/${id}`)
  return response.data
}
