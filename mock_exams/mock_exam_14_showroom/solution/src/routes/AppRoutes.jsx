import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import CarList from '../pages/CarList'
import CarDetail from '../pages/CarDetail'
import AddCar from '../pages/AddCar'
import ManageDealers from '../pages/ManageDealers'
import DealerDetail from '../pages/DealerDetail'
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
            <CarList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cars/:id"
        element={
          <ProtectedRoute>
            <CarDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddCar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dealers"
        element={
          <ProtectedRoute>
            <ManageDealers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dealers/:id"
        element={
          <ProtectedRoute>
            <DealerDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
