const API = 'http://localhost:5000/api/batches'

// GET batches
export const getBatches = async () => {
const response = await fetch(API)

if (!response.ok) {
throw new Error('Failed to fetch batches')
}

return response.json()
}

// ADD batch
export const addBatch = async (batch) => {
const response = await fetch(API, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(batch),
})

if (!response.ok) {
throw new Error('Failed to add batch')
}

return response.json()
}

// UPDATE batch
export const updateBatch = async (id, batch) => {
const response = await fetch(`${API}/${id}`, {
method: 'PUT',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(batch),
})

if (!response.ok) {
throw new Error('Failed to update batch')
}

return response.json()
}

// DELETE batch
export const deleteBatch = async (id) => {
const response = await fetch(`${API}/${id}`, {
method: 'DELETE',
})

if (!response.ok) {
throw new Error('Failed to delete batch')
}

return response.json()
}
