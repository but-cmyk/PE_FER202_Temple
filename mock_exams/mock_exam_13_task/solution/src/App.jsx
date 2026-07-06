import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { TaskProvider } from './context/TaskContext'
import AppNavbar from './components/AppNavbar'
import AppFooter from './components/AppFooter'
import AppRoutes from './routes/AppRoutes'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <div className="d-flex flex-column min-vh-host min-vh-100">
            <AppNavbar />
            <main className="flex-grow-1">
              <AppRoutes />
            </main>
            <AppFooter />
          </div>
        </TaskProvider>
      </AuthProvider>
    </Router>
  )
}
