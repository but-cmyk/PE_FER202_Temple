import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import MovieList from '../pages/MovieList'
import MovieDetail from '../pages/MovieDetail'
import AddMovie from '../pages/AddMovie'
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
            <MovieList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movies/:id"
        element={
          <ProtectedRoute>
            <MovieDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddMovie />
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
