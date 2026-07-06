import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchRoomTypes = async () => {
  const response = await axios.get(`${BASE_URL}/roomTypes`)
  return response.data
}

export const fetchRoomTypeById = async (id) => {
  const response = await axios.get(`${BASE_URL}/roomTypes/${id}`)
  return response.data
}

export const addRoomType = async (data) => {
  const response = await axios.post(`${BASE_URL}/roomTypes`, data)
  return response.data
}

export const deleteRoomType = async (id) => {
  const response = await axios.delete(`${BASE_URL}/roomTypes/${id}`)
  return response.data
}

export const fetchRooms = async () => {
  const response = await axios.get(`${BASE_URL}/rooms`)
  return response.data
}

export const fetchRoomById = async (id) => {
  const response = await axios.get(`${BASE_URL}/rooms/${id}`)
  return response.data
}

export const addRoom = async (data) => {
  const response = await axios.post(`${BASE_URL}/rooms`, data)
  return response.data
}

export const deleteRoom = async (id) => {
  const response = await axios.delete(`${BASE_URL}/rooms/${id}`)
  return response.data
}
