import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import StudentList from '../pages/StudentList'
import StudentDetail from '../pages/StudentDetail'
import AddStudent from '../pages/AddStudent'
import ManageDepartments from '../pages/ManageDepartments'
import DepartmentDetail from '../pages/DepartmentDetail'
import NotFound from '../pages/NotFound'
import ProtectedRoute from './ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <StudentList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/students/:id"
        element={
          <ProtectedRoute>
            <StudentDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddStudent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/departments"
        element={
          <ProtectedRoute>
            <ManageDepartments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/departments/:id"
        element={
          <ProtectedRoute>
            <DepartmentDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
