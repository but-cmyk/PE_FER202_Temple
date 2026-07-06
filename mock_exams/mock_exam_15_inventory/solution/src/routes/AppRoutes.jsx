import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import ItemList from '../pages/ItemList'
import ItemDetail from '../pages/ItemDetail'
import AddItem from '../pages/AddItem'
import ManageSuppliers from '../pages/ManageSuppliers'
import SupplierDetail from '../pages/SupplierDetail'
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
            <ItemList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/items/:id"
        element={
          <ProtectedRoute>
            <ItemDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddItem />
          </ProtectedRoute>
        }
      />
      <Route
        path="/suppliers"
        element={
          <ProtectedRoute>
            <ManageSuppliers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/suppliers/:id"
        element={
          <ProtectedRoute>
            <SupplierDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
