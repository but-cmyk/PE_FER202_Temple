import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import ProductList from '../pages/ProductList'
import ProductDetail from '../pages/ProductDetail'
import AddProduct from '../pages/AddProduct'
import ManageBrands from '../pages/ManageBrands'
import BrandDetail from '../pages/BrandDetail'
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
            <ProductList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/:id"
        element={
          <ProtectedRoute>
            <ProductDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/brands"
        element={
          <ProtectedRoute>
            <ManageBrands />
          </ProtectedRoute>
        }
      />
      <Route
        path="/brands/:id"
        element={
          <ProtectedRoute>
            <BrandDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
