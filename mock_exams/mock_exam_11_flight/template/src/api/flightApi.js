import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchAirlines = async () => {
  const response = await axios.get(`${BASE_URL}/airlines`)
  return response.data
}

export const fetchAirlineById = async (id) => {
  const response = await axios.get(`${BASE_URL}/airlines/${id}`)
  return response.data
}

export const addAirline = async (data) => {
  const response = await axios.post(`${BASE_URL}/airlines`, data)
  return response.data
}

export const deleteAirline = async (id) => {
  const response = await axios.delete(`${BASE_URL}/airlines/${id}`)
  return response.data
}

export const fetchFlights = async () => {
  const response = await axios.get(`${BASE_URL}/flights`)
  return response.data
}

export const fetchFlightById = async (id) => {
  const response = await axios.get(`${BASE_URL}/flights/${id}`)
  return response.data
}

export const addFlight = async (data) => {
  const response = await axios.post(`${BASE_URL}/flights`, data)
  return response.data
}

export const deleteFlight = async (id) => {
  const response = await axios.delete(`${BASE_URL}/flights/${id}`)
  return response.data
}
