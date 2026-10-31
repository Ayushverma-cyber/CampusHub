[![CI](https://github.com/Ayushverma-cyber/CampusHub/actions/workflows/ci.yml/badge.svg)](https://github.com/Ayushverma-cyber/CampusHub/actions/workflows/ci.yml)

# CampusHub – Student Management System

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/API-Express-black?logo=express)
![TiDB](https://img.shields.io/badge/Database-TiDB%20Cloud-orange)
![Vercel](https://img.shields.io/badge/Frontend%20Hosting-Vercel-black?logo=vercel)
![Render](https://img.shields.io/badge/Backend%20Hosting-Render-purple?logo=render)

A full-stack **role-based Student Management System** that enables administrators and faculty to manage student records, attendance, grades, batches, and courses, while students can securely access their own academic information.

---

## Live Demo

- **Frontend:** https://campus-hub-blush-beta.vercel.app
- **Backend API:** https://campushub-backend-y35m.onrender.com

---

## Features

### Admin
- Add, edit, and delete students.
- Manage attendance records.
- Manage grades and marks.
- Create and manage batches.
- Create and manage courses.

### Faculty
- View student information.
- Mark attendance.
- Manage grades.
- View batches and courses.

### Student
- Personal dashboard.
- View own attendance.
- View own grades.
- View assigned batch.
- View enrolled courses.

---

## Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- React Hook Form
- React Hot Toast
- Lucide React

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- TiDB Cloud (MySQL-compatible)

### Deployment
- Vercel – Frontend hosting
- Render – Backend hosting
- TiDB Cloud – Database hosting

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

### 3. Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs locally at:

```text
http://localhost:5173
```

Backend runs locally at:

```text
http://localhost:5000
```

---

## Database Setup

CampusHub uses **TiDB Cloud**, which is compatible with MySQL.

Configure the following environment variables in the backend `.env` file:

```env
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```

For production, configure these environment variables in the Render dashboard.

**Important:** Never upload your `.env` file or actual database credentials to GitHub.

---

## API Endpoints

### Authentication

- `POST /api/auth/login`
- `POST /api/auth/register`

### Students

- `GET /api/students`
- `POST /api/students`
- `PUT /api/students/:id`
- `DELETE /api/students/:id`

### Courses

- `GET /api/courses`
- `POST /api/courses`

### Grades

- `GET /api/grades`
- `POST /api/grades`
- `PUT /api/grades/:id`
- `DELETE /api/grades/:id`

### Batches

- `GET /api/batches`
- `POST /api/batches`
- `PUT /api/batches/:id`
- `DELETE /api/batches/:id`

The application also provides student-specific APIs for attendance, grades, batches, and enrolled courses.

---

## Deployment

### Frontend
- Hosted on Vercel.
- Connected to the GitHub repository.
- Automatically redeployed when changes are pushed to the configured branch.

### Backend
- Hosted on Render.
- Connected to TiDB Cloud.
- Production environment variables configured in Render.

### Database
- Hosted on TiDB Cloud.
- MySQL-compatible database connection using `mysql2`.

---

## Security Features

- Role-based access control (Admin, Faculty, Student).
- Protected application routes.
- Student-specific data filtering.
- JWT-based authentication.
- Logout and session cleanup.

---

## Key Learnings

- Full-stack React and Express development.
- REST API development and integration.
- MySQL-compatible database management.
- Role-based access control.
- State management using React hooks.
- Form handling and validation.
- Cloud deployment using Vercel and Render.
- Database integration using TiDB Cloud.

---

## Future Improvements

- Pagination and search functionality.
- Student document uploads.
- Email notifications.
- Attendance analytics and charts.
- Dark/light theme toggle.
- Docker-based deployment.

---

## Author

**Ayush Verma**

- GitHub: https://github.com/Ayushverma-cyber
- LinkedIn: https://www.linkedin.com/in/ayush-verma-596159383/

---

## License

This project is intended for educational and portfolio purposes.