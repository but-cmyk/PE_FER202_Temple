import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const login = async (username, password) => {
  const response = await axios.get(`${BASE_URL}/users`)
  const users = response.data
  const user = users.find(u => u.username === username && u.password === password)
  if (!user) {
    throw new Error('Invalid username or password.')
  }
  
  return user
}
