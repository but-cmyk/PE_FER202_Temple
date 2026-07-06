import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import BookList from '../pages/BookList'
import BookDetail from '../pages/BookDetail'
import AddBook from '../pages/AddBook'
import ManageGenres from '../pages/ManageGenres'
import GenreDetail from '../pages/GenreDetail'
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
            <BookList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/books/:id"
        element={
          <ProtectedRoute>
            <BookDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddBook />
          </ProtectedRoute>
        }
      />
      <Route
        path="/genres"
        element={
          <ProtectedRoute>
            <ManageGenres />
          </ProtectedRoute>
        }
      />
      <Route
        path="/genres/:id"
        element={
          <ProtectedRoute>
            <GenreDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
