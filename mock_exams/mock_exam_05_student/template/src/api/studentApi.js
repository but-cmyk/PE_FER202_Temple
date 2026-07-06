import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchDepartments = async () => {
  const response = await axios.get(`${BASE_URL}/departments`)
  return response.data
}

export const fetchDepartmentById = async (id) => {
  const response = await axios.get(`${BASE_URL}/departments/${id}`)
  return response.data
}

export const addDepartment = async (data) => {
  const response = await axios.post(`${BASE_URL}/departments`, data)
  return response.data
}

export const deleteDepartment = async (id) => {
  const response = await axios.delete(`${BASE_URL}/departments/${id}`)
  return response.data
}

export const fetchStudents = async () => {
  const response = await axios.get(`${BASE_URL}/students`)
  return response.data
}

export const fetchStudentById = async (id) => {
  const response = await axios.get(`${BASE_URL}/students/${id}`)
  return response.data
}

export const addStudent = async (data) => {
  const response = await axios.post(`${BASE_URL}/students`, data)
  return response.data
}

export const deleteStudent = async (id) => {
  const response = await axios.delete(`${BASE_URL}/students/${id}`)
  return response.data
}
