import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchCompanies = async () => {
  const response = await axios.get(`${BASE_URL}/companies`)
  return response.data
}

export const fetchCompanyById = async (id) => {
  const response = await axios.get(`${BASE_URL}/companies/${id}`)
  return response.data
}

export const addCompany = async (data) => {
  const response = await axios.post(`${BASE_URL}/companies`, data)
  return response.data
}

export const deleteCompany = async (id) => {
  const response = await axios.delete(`${BASE_URL}/companies/${id}`)
  return response.data
}

export const fetchJobs = async () => {
  const response = await axios.get(`${BASE_URL}/jobs`)
  return response.data
}

export const fetchJobById = async (id) => {
  const response = await axios.get(`${BASE_URL}/jobs/${id}`)
  return response.data
}

export const addJob = async (data) => {
  const response = await axios.post(`${BASE_URL}/jobs`, data)
  return response.data
}

export const deleteJob = async (id) => {
  const response = await axios.delete(`${BASE_URL}/jobs/${id}`)
  return response.data
}
