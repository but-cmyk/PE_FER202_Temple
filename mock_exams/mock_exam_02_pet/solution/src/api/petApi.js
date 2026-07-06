import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchBreeds = async () => {
  const response = await axios.get(`${BASE_URL}/breeds`)
  return response.data
}

export const fetchBreedById = async (id) => {
  const response = await axios.get(`${BASE_URL}/breeds/${id}`)
  return response.data
}

export const addBreed = async (data) => {
  const response = await axios.post(`${BASE_URL}/breeds`, data)
  return response.data
}

export const deleteBreed = async (id) => {
  const response = await axios.delete(`${BASE_URL}/breeds/${id}`)
  return response.data
}

export const fetchPets = async () => {
  const response = await axios.get(`${BASE_URL}/pets`)
  return response.data
}

export const fetchPetById = async (id) => {
  const response = await axios.get(`${BASE_URL}/pets/${id}`)
  return response.data
}

export const addPet = async (data) => {
  const response = await axios.post(`${BASE_URL}/pets`, data)
  return response.data
}

export const deletePet = async (id) => {
  const response = await axios.delete(`${BASE_URL}/pets/${id}`)
  return response.data
}
