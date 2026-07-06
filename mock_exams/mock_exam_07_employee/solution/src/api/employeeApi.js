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

export const fetchEmployees = async () => {
  const response = await axios.get(`${BASE_URL}/employees`)
  return response.data
}

export const fetchEmployeeById = async (id) => {
  const response = await axios.get(`${BASE_URL}/employees/${id}`)
  return response.data
}

export const addEmployee = async (data) => {
  const response = await axios.post(`${BASE_URL}/employees`, data)
  return response.data
}

export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${BASE_URL}/employees/${id}`)
  return response.data
}
