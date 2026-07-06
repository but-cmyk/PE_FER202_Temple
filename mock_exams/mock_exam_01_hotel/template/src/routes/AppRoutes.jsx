import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import RoomList from '../pages/RoomList'
import RoomDetail from '../pages/RoomDetail'
import AddRoom from '../pages/AddRoom'
import ManageRoomTypes from '../pages/ManageRoomTypes'
import RoomTypeDetail from '../pages/RoomTypeDetail'
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
            <RoomList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rooms/:id"
        element={
          <ProtectedRoute>
            <RoomDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddRoom />
          </ProtectedRoute>
        }
      />
      <Route
        path="/roomTypes"
        element={
          <ProtectedRoute>
            <ManageRoomTypes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/roomTypes/:id"
        element={
          <ProtectedRoute>
            <RoomTypeDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
