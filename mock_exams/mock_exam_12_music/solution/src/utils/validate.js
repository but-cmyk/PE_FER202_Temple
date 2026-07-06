export const validateUsername = (username) => {
  if (!username || username.trim().length < 3) return 'Username must be at least 3 characters.'
  return null
}

export const validatePassword = (password) => {
  if (!password || password.length < 5) return 'Password must be at least 5 characters.'
  return null
}
