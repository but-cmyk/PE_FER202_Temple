import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchModules = async () => {
  const response = await axios.get(`${BASE_URL}/modules`)
  return response.data
}

export const fetchModuleById = async (id) => {
  const response = await axios.get(`${BASE_URL}/modules/${id}`)
  return response.data
}

export const addModule = async (data) => {
  const response = await axios.post(`${BASE_URL}/modules`, data)
  return response.data
}

export const deleteModule = async (id) => {
  const response = await axios.delete(`${BASE_URL}/modules/${id}`)
  return response.data
}

export const fetchLessons = async () => {
  const response = await axios.get(`${BASE_URL}/lessons`)
  return response.data
}

export const fetchLessonById = async (id) => {
  const response = await axios.get(`${BASE_URL}/lessons/${id}`)
  return response.data
}

export const addLesson = async (data) => {
  const response = await axios.post(`${BASE_URL}/lessons`, data)
  return response.data
}

export const deleteLesson = async (id) => {
  const response = await axios.delete(`${BASE_URL}/lessons/${id}`)
  return response.data
}
