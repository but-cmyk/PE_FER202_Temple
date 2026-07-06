import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import SongList from '../pages/SongList'
import SongDetail from '../pages/SongDetail'
import AddSong from '../pages/AddSong'
import ManageArtists from '../pages/ManageArtists'
import ArtistDetail from '../pages/ArtistDetail'
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
            <SongList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/songs/:id"
        element={
          <ProtectedRoute>
            <SongDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddSong />
          </ProtectedRoute>
        }
      />
      <Route
        path="/artists"
        element={
          <ProtectedRoute>
            <ManageArtists />
          </ProtectedRoute>
        }
      />
      <Route
        path="/artists/:id"
        element={
          <ProtectedRoute>
            <ArtistDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
