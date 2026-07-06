import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import PetList from '../pages/PetList'
import PetDetail from '../pages/PetDetail'
import AddPet from '../pages/AddPet'
import ManageBreeds from '../pages/ManageBreeds'
import BreedDetail from '../pages/BreedDetail'
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
            <PetList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pets/:id"
        element={
          <ProtectedRoute>
            <PetDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddPet />
          </ProtectedRoute>
        }
      />
      <Route
        path="/breeds"
        element={
          <ProtectedRoute>
            <ManageBreeds />
          </ProtectedRoute>
        }
      />
      <Route
        path="/breeds/:id"
        element={
          <ProtectedRoute>
            <BreedDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
