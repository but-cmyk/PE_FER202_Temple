import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchDoctors = async () => {
  const response = await axios.get(`${BASE_URL}/doctors`)
  return response.data
}

export const fetchDoctorById = async (id) => {
  const response = await axios.get(`${BASE_URL}/doctors/${id}`)
  return response.data
}

export const addDoctor = async (data) => {
  const response = await axios.post(`${BASE_URL}/doctors`, data)
  return response.data
}

export const deleteDoctor = async (id) => {
  const response = await axios.delete(`${BASE_URL}/doctors/${id}`)
  return response.data
}

export const fetchAppointments = async () => {
  const response = await axios.get(`${BASE_URL}/appointments`)
  return response.data
}

export const fetchAppointmentById = async (id) => {
  const response = await axios.get(`${BASE_URL}/appointments/${id}`)
  return response.data
}

export const addAppointment = async (data) => {
  const response = await axios.post(`${BASE_URL}/appointments`, data)
  return response.data
}

export const deleteAppointment = async (id) => {
  const response = await axios.delete(`${BASE_URL}/appointments/${id}`)
  return response.data
}
