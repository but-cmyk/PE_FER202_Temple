import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import RecipeList from '../pages/RecipeList'
import RecipeDetail from '../pages/RecipeDetail'
import AddRecipe from '../pages/AddRecipe'
import ManageCuisines from '../pages/ManageCuisines'
import CuisineDetail from '../pages/CuisineDetail'
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
            <RecipeList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recipes/:id"
        element={
          <ProtectedRoute>
            <RecipeDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddRecipe />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cuisines"
        element={
          <ProtectedRoute>
            <ManageCuisines />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cuisines/:id"
        element={
          <ProtectedRoute>
            <CuisineDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
