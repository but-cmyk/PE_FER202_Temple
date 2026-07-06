import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchDealers = async () => {
  const response = await axios.get(`${BASE_URL}/dealers`)
  return response.data
}

export const fetchDealerById = async (id) => {
  const response = await axios.get(`${BASE_URL}/dealers/${id}`)
  return response.data
}

export const addDealer = async (data) => {
  const response = await axios.post(`${BASE_URL}/dealers`, data)
  return response.data
}

export const deleteDealer = async (id) => {
  const response = await axios.delete(`${BASE_URL}/dealers/${id}`)
  return response.data
}

export const fetchCars = async () => {
  const response = await axios.get(`${BASE_URL}/cars`)
  return response.data
}

export const fetchCarById = async (id) => {
  const response = await axios.get(`${BASE_URL}/cars/${id}`)
  return response.data
}

export const addCar = async (data) => {
  const response = await axios.post(`${BASE_URL}/cars`, data)
  return response.data
}

export const deleteCar = async (id) => {
  const response = await axios.delete(`${BASE_URL}/cars/${id}`)
  return response.data
}
