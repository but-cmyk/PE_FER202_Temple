import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { PropertyProvider } from '../context/PropertyContext'
import AppNavbar from '../components/AppNavbar'
import AppRoutes from '../routes/AppRoutes'
import * as entityApi from '../api/propertyApi'
import * as authApi from '../api/authApi'

jest.mock('../api/propertyApi')
jest.mock('../api/authApi')

const renderApp = (initialPath) =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AuthProvider>
        <PropertyProvider>
          <AppNavbar />
          <AppRoutes />
        </PropertyProvider>
      </AuthProvider>
    </MemoryRouter>
  )

describe('AuthContext — phiên đăng nhập phải được giữ lại khi reload / truy cập trực tiếp URL', () => {
  beforeEach(() => {
    entityApi.fetchAgents.mockResolvedValue([{ id: '1', name: 'Standard' }])
    entityApi.fetchProperties.mockResolvedValue([])
  })

  test('chưa từng đăng nhập → truy cập /agents/999 lần đầu sẽ về trang Login (đúng, không phải bug)', async () => {
    renderApp('/agents/999')
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    })
  })

  test('BUG ĐÃ FIX: đăng nhập thành công, sau đó "reload" (remount) tại /agents/999 → vẫn còn phiên đăng nhập, KHÔNG bị đưa về Login', async () => {
    authApi.login.mockResolvedValue({
      id: '1', username: 'admin', role: 'Admin', email: 'admin@test.com', fullName: 'Rental Manager',
    })

    const { unmount } = renderApp('/login')
    fireEvent.change(screen.getByPlaceholderText(/Enter username/i), { target: { value: 'admin' } })
    fireEvent.change(screen.getByPlaceholderText(/Enter password/i), { target: { value: 'admin123' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'Login' })).not.toBeInTheDocument()
    })

    // Unmount toàn bộ app rồi render lại từ đầu tại URL khác — mô phỏng đúng
    // hành vi reload trang / dán URL /agents/999 vào thanh địa chỉ.
    unmount()
    renderApp('/agents/999')
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'Login' })).not.toBeInTheDocument()
    })
  })

  test('logout → xóa phiên đăng nhập → reload lại route bảo vệ sẽ về Login', async () => {
    authApi.login.mockResolvedValue({
      id: '1', username: 'admin', role: 'Admin', email: 'admin@test.com', fullName: 'Rental Manager',
    })
    const { unmount } = renderApp('/login')
    fireEvent.change(screen.getByPlaceholderText(/Enter username/i), { target: { value: 'admin' } })
    fireEvent.change(screen.getByPlaceholderText(/Enter password/i), { target: { value: 'admin123' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'Login' })).not.toBeInTheDocument()
    })
    fireEvent.click(screen.getByRole('button', { name: /logout/i }))
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    })

    unmount()
    renderApp('/agents/999')
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    })
  })
})
