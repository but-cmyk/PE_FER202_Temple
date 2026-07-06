import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchTrainers = async () => {
  const response = await axios.get(`${BASE_URL}/trainers`)
  return response.data
}

export const fetchTrainerById = async (id) => {
  const response = await axios.get(`${BASE_URL}/trainers/${id}`)
  return response.data
}

export const addTrainer = async (data) => {
  const response = await axios.post(`${BASE_URL}/trainers`, data)
  return response.data
}

export const deleteTrainer = async (id) => {
  const response = await axios.delete(`${BASE_URL}/trainers/${id}`)
  return response.data
}

export const fetchGymClasses = async () => {
  const response = await axios.get(`${BASE_URL}/gymClasses`)
  return response.data
}

export const fetchGymClassById = async (id) => {
  const response = await axios.get(`${BASE_URL}/gymClasses/${id}`)
  return response.data
}

export const addGymClass = async (data) => {
  const response = await axios.post(`${BASE_URL}/gymClasses`, data)
  return response.data
}

export const deleteGymClass = async (id) => {
  const response = await axios.delete(`${BASE_URL}/gymClasses/${id}`)
  return response.data
}
