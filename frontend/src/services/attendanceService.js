const API = 'http://localhost:5000/api/attendance'

// GET attendance records
export const getAttendance = async () => {
const response = await fetch(API)

if (!response.ok) {
throw new Error('Failed to fetch attendance')
}

return response.json()
}

// MARK attendance
export const markAttendance = async (attendance) => {
const response = await fetch(API, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(attendance),
})

if (!response.ok) {
throw new Error('Failed to mark attendance')
}

return response.json()
}

// DELETE attendance record
export const deleteAttendance = async (id) => {
const response = await fetch(`${API}/${id}`, {
method: 'DELETE',
})

if (!response.ok) {
throw new Error('Failed to delete attendance')
}

return response.json()
}
