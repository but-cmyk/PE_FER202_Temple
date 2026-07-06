import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchProjects = async () => {
  const response = await axios.get(`${BASE_URL}/projects`)
  return response.data
}

export const fetchProjectById = async (id) => {
  const response = await axios.get(`${BASE_URL}/projects/${id}`)
  return response.data
}

export const addProject = async (data) => {
  const response = await axios.post(`${BASE_URL}/projects`, data)
  return response.data
}

export const deleteProject = async (id) => {
  const response = await axios.delete(`${BASE_URL}/projects/${id}`)
  return response.data
}

export const fetchTasks = async () => {
  const response = await axios.get(`${BASE_URL}/tasks`)
  return response.data
}

export const fetchTaskById = async (id) => {
  const response = await axios.get(`${BASE_URL}/tasks/${id}`)
  return response.data
}

export const addTask = async (data) => {
  const response = await axios.post(`${BASE_URL}/tasks`, data)
  return response.data
}

export const deleteTask = async (id) => {
  const response = await axios.delete(`${BASE_URL}/tasks/${id}`)
  return response.data
}
