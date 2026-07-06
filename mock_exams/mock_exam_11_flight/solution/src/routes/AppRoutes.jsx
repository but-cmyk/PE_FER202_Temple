import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import FlightList from '../pages/FlightList'
import FlightDetail from '../pages/FlightDetail'
import AddFlight from '../pages/AddFlight'
import ManageAirlines from '../pages/ManageAirlines'
import AirlineDetail from '../pages/AirlineDetail'
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
            <FlightList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/flights/:id"
        element={
          <ProtectedRoute>
            <FlightDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddFlight />
          </ProtectedRoute>
        }
      />
      <Route
        path="/airlines"
        element={
          <ProtectedRoute>
            <ManageAirlines />
          </ProtectedRoute>
        }
      />
      <Route
        path="/airlines/:id"
        element={
          <ProtectedRoute>
            <AirlineDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
