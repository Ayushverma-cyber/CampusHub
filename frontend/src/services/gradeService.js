const API = 'https://campushub-production-b658.up.railway.app/api/grades'

// GET all grades
export const getGrades = async () => {
const response = await fetch(API)

if (!response.ok) {
throw new Error('Failed to fetch grades')
}

return response.json()
}

// ADD grade
export const addGrade = async (grade) => {
const response = await fetch(API, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(grade),
})

if (!response.ok) {
throw new Error('Failed to add grade')
}

return response.json()
}

// UPDATE grade
export const updateGrade = async (id, grade) => {
const response = await fetch(`${API}/${id}`, {
method: 'PUT',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(grade),
})

if (!response.ok) {
throw new Error('Failed to update grade')
}

return response.json()
}

// DELETE grade
export const deleteGrade = async (id) => {
const response = await fetch(`${API}/${id}`, {
method: 'DELETE',
})

if (!response.ok) {
throw new Error('Failed to delete grade')
}

return response.json()
}
