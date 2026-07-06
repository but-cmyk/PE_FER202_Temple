import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import GigList from '../pages/GigList'
import GigDetail from '../pages/GigDetail'
import AddGig from '../pages/AddGig'
import ManageCategories from '../pages/ManageCategories'
import CategoryDetail from '../pages/CategoryDetail'
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
            <GigList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/gigs/:id"
        element={
          <ProtectedRoute>
            <GigDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddGig />
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <ManageCategories />
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories/:id"
        element={
          <ProtectedRoute>
            <CategoryDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
