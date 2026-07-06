import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchAgents = async () => {
  const response = await axios.get(`${BASE_URL}/agents`)
  return response.data
}

export const fetchAgentById = async (id) => {
  const response = await axios.get(`${BASE_URL}/agents/${id}`)
  return response.data
}

export const addAgent = async (data) => {
  const response = await axios.post(`${BASE_URL}/agents`, data)
  return response.data
}

export const deleteAgent = async (id) => {
  const response = await axios.delete(`${BASE_URL}/agents/${id}`)
  return response.data
}

export const fetchProperties = async () => {
  const response = await axios.get(`${BASE_URL}/properties`)
  return response.data
}

export const fetchPropertyById = async (id) => {
  const response = await axios.get(`${BASE_URL}/properties/${id}`)
  return response.data
}

export const addProperty = async (data) => {
  const response = await axios.post(`${BASE_URL}/properties`, data)
  return response.data
}

export const deleteProperty = async (id) => {
  const response = await axios.delete(`${BASE_URL}/properties/${id}`)
  return response.data
}
