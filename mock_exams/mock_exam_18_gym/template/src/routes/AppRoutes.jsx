import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import GymClassList from '../pages/GymClassList'
import GymClassDetail from '../pages/GymClassDetail'
import AddGymClass from '../pages/AddGymClass'
import ManageTrainers from '../pages/ManageTrainers'
import TrainerDetail from '../pages/TrainerDetail'
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
            <GymClassList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/gymClasses/:id"
        element={
          <ProtectedRoute>
            <GymClassDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddGymClass />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trainers"
        element={
          <ProtectedRoute>
            <ManageTrainers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trainers/:id"
        element={
          <ProtectedRoute>
            <TrainerDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
