const API = 'http://localhost:5000/api/auth'

export const loginUser = async (credentials) => {
const response = await fetch(`${API}/login`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(credentials),
})

const data = await response.json()

if (!response.ok) {
throw new Error(data.message || 'Login failed')
}

return data
}

export const registerUser = async (user) => {
const response = await fetch(`${API}/register`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(user),
})

const data = await response.json()

if (!response.ok) {
throw new Error(data.message || 'Registration failed')
}

return data
}
