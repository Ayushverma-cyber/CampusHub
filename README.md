# CampusHub – Student Management System

A full-stack **role-based Student Management System** that allows administrators and faculty to manage student records, attendance, grades, batches, and courses, while students can securely access only their own academic information.

---

## Features

### Admin

* Add, edit, and delete students
* Manage attendance records
* Manage grades and marks
* Create and manage batches
* Create and manage courses

### Faculty

* View students
* Mark attendance
* Manage grades
* View batches and courses

### Student

* Personal dashboard
* View own attendance
* View own grades
* View own batch
* View enrolled courses only

---

## Tech Stack

### Frontend

* React
* React Router
* Tailwind CSS
* React Hook Form
* React Hot Toast

### Backend

* Node.js
* Express.js

### Database

* MySQL

---

## Project Structure

```text
CampusHub/
├── backend/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── README.md
└── .gitignore
```



## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Ayushverma-cyber/CampusHub.git
cd CampusHub
```

### 2. Backend setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on: **https://campushub-production-b658.up.railway.app**

### 3. Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## Database Setup

Create a MySQL database named `campushub` and import your SQL schema.

Update database credentials in:

```text
backend/db.js
```

---

## API Endpoints

### Authentication

* `POST /api/auth/login`
* `POST /api/auth/register`

### Students

* `GET /api/students`
* `POST /api/students`
* `PUT /api/students/:id`
* `DELETE /api/students/:id`

### Student Personal APIs

* `GET /api/students/student-attendance/:email`
* `GET /api/students/student-grades/:email`
* `GET /api/students/student-batch/:email`
* `GET /api/students/student-courses/:email`

### Courses

* `GET /api/courses`
* `POST /api/courses`

### Grades

* `GET /api/grades`
* `POST /api/grades`
* `PUT /api/grades/:id`
* `DELETE /api/grades/:id`

### Batches

* `GET /api/batches`
* `POST /api/batches`
* `PUT /api/batches/:id`
* `DELETE /api/batches/:id`

---

## Demo Credentials

### Admin

* **Email:** [admin@campushub.com](mailto:admin@campushub.com)
* **Password:** 123456

### Faculty

* **Email:** [faculty@campushub.com](mailto:faculty@campushub.com)
* **Password:** 123456

### Student

* **Email:** [ayush@campushub.com](mailto:ayush@campushub.com)
* **Password:** 123456

---


## Security Features

* Role-based route protection
* Protected API access
* Student-specific data filtering
* Secure login workflow
* Logout session cleanup

---

## Key Learnings

* Full-stack React + Express development
* REST API design
* MySQL database relationships
* Role-based access control (RBAC)
* State management with React hooks
* Form handling with React Hook Form
* Toast notifications and UX improvements

---

## Future Improvements

* JWT authentication with middleware
* Password hashing with bcrypt
* Pagination and search APIs
* File upload for student documents
* Email notifications
* Attendance analytics and charts
* Cloud deployment (Vercel + Render)

---

## Author

**Ayush Verma**

* GitHub: https://github.com/Ayushverma-cyber
* LinkedIn: https://www.linkedin.com/in/ayush-verma-596159383/

---

## License

This project is for educational and portfolio purposes.
