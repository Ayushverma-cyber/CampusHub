# CampusHub – Student Management System

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/API-Express-black?logo=express)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange?logo=mysql)
![Vercel](https://img.shields.io/badge/Frontend%20Hosting-Vercel-black?logo=vercel)
![Railway](https://img.shields.io/badge/Backend%20Hosting-Railway-purple)

A full-stack **role-based Student Management System** that enables administrators and faculty to manage student records, attendance, grades, batches, and courses, while students can securely access only their own academic information.

---

## Live Demo

* **Frontend:** https://campus-hub-blush-beta.vercel.app
* **Backend API:**  https://campushub-production-b658.up.railway.app
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

---

## Local Installation

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

Backend runs locally on:

```text
http://localhost:5000
```

### 3. Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs locally on:

```text
http://localhost:5173
```

---

## Database Setup

1. Create a MySQL database named **campushub**.
2. Import your SQL schema.
3. Configure environment variables for the backend:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=campushub
DB_PORT=3306
```

For production deployment, Railway environment variables are used instead of local values.

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

> These credentials are for demonstration purposes only.

---

## Deployment

### Frontend

* Hosted on **Vercel**
* React Router configured using `vercel.json`

### Backend

* Hosted on **Railway**
* Connected to **Railway MySQL** database
* Environment variables configured in Railway dashboard

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
* Cloud deployment with Vercel and Railway

---

## Future Improvements

* JWT authentication middleware
* Password hashing with bcrypt
* Pagination and search APIs
* File upload for student documents
* Email notifications
* Attendance analytics and charts
* Dark/light theme toggle
* Docker-based deployment

---

## Author

**Ayush Verma**

* GitHub: https://github.com/Ayushverma-cyber
* LinkedIn: https://www.linkedin.com/in/ayush-verma-596159383/

---

## License

This project is intended for **educational and portfolio purposes**.
