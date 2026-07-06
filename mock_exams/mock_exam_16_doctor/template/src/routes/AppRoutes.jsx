import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import AppointmentList from '../pages/AppointmentList'
import AppointmentDetail from '../pages/AppointmentDetail'
import AddAppointment from '../pages/AddAppointment'
import ManageDoctors from '../pages/ManageDoctors'
import DoctorDetail from '../pages/DoctorDetail'
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
            <AppointmentList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointments/:id"
        element={
          <ProtectedRoute>
            <AppointmentDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddAppointment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors"
        element={
          <ProtectedRoute>
            <ManageDoctors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/:id"
        element={
          <ProtectedRoute>
            <DoctorDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
