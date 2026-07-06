import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import JobList from '../pages/JobList'
import JobDetail from '../pages/JobDetail'
import AddJob from '../pages/AddJob'
import ManageCompanies from '../pages/ManageCompanies'
import CompanyDetail from '../pages/CompanyDetail'
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
            <JobList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/jobs/:id"
        element={
          <ProtectedRoute>
            <JobDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddJob />
          </ProtectedRoute>
        }
      />
      <Route
        path="/companies"
        element={
          <ProtectedRoute>
            <ManageCompanies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/companies/:id"
        element={
          <ProtectedRoute>
            <CompanyDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
