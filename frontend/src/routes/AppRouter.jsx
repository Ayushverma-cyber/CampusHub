import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";

import AuthPage from "../context/AuthPage";
import Students from "../pages/Students";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Attendence from "../pages/Attendence";
import Course from "../pages/Course";
import Create from "../pages/Create";
import Delete from "../pages/Delete";
import NotFound from "../pages/NotFound";
import Register from "../components/Register";
import AddStudent from "../pages/AddStudent";
import EditStudent from "../pages/EditStudent";
import ProtectedRoute from "./ProtectedRoute";
import Grades from "../pages/Grades";
import Batches from "../pages/Batches";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages */}
        <Route element={<AuthLayout />}>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Main app */}
        <Route element={<MainLayout />}>
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={["admin", "faculty", "student"]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "faculty", "student"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute allowedRoles={["admin", "faculty","student"]}  >
                <Attendence />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course"
            element={
              <ProtectedRoute allowedRoles={["admin", "faculty","student"]}>
                <Course />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                  <Create />
              </ProtectedRoute>
            }
          />
          <Route path="/delete" element={<Delete />} />
          <Route
            path="/students/add"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                  <AddStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                  <EditStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students"
            element={
              <ProtectedRoute allowedRoles={["admin", "faculty"]}>
                <Students />
              </ProtectedRoute>
            }
          />
          <Route
            path="/grades"
            element={
              <ProtectedRoute   allowedRoles={["admin", "faculty","student"]}>
                <Grades />
              </ProtectedRoute>
            }
          />
          <Route
            path="/batches"
            element={
              <ProtectedRoute allowedRoles={["admin", "faculty","student"]}>
                <Batches />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Default route */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
