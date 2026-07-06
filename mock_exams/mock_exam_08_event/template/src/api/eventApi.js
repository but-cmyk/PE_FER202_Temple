import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchLocations = async () => {
  const response = await axios.get(`${BASE_URL}/locations`)
  return response.data
}

export const fetchLocationById = async (id) => {
  const response = await axios.get(`${BASE_URL}/locations/${id}`)
  return response.data
}

export const addLocation = async (data) => {
  const response = await axios.post(`${BASE_URL}/locations`, data)
  return response.data
}

export const deleteLocation = async (id) => {
  const response = await axios.delete(`${BASE_URL}/locations/${id}`)
  return response.data
}

export const fetchEvents = async () => {
  const response = await axios.get(`${BASE_URL}/events`)
  return response.data
}

export const fetchEventById = async (id) => {
  const response = await axios.get(`${BASE_URL}/events/${id}`)
  return response.data
}

export const addEvent = async (data) => {
  const response = await axios.post(`${BASE_URL}/events`, data)
  return response.data
}

export const deleteEvent = async (id) => {
  const response = await axios.delete(`${BASE_URL}/events/${id}`)
  return response.data
}
