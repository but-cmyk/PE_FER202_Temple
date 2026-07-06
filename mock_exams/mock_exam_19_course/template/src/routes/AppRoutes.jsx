import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import LessonList from '../pages/LessonList'
import LessonDetail from '../pages/LessonDetail'
import AddLesson from '../pages/AddLesson'
import ManageModules from '../pages/ManageModules'
import ModuleDetail from '../pages/ModuleDetail'
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
            <LessonList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lessons/:id"
        element={
          <ProtectedRoute>
            <LessonDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddLesson />
          </ProtectedRoute>
        }
      />
      <Route
        path="/modules"
        element={
          <ProtectedRoute>
            <ManageModules />
          </ProtectedRoute>
        }
      />
      <Route
        path="/modules/:id"
        element={
          <ProtectedRoute>
            <ModuleDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
