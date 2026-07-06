import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { ItemProvider } from '../context/ItemContext'
import AppNavbar from '../components/AppNavbar'
import AppRoutes from '../routes/AppRoutes'
import * as entityApi from '../api/itemApi'
import * as authApi from '../api/authApi'

jest.mock('../api/itemApi')
jest.mock('../api/authApi')

const renderApp = (initialPath) =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AuthProvider>
        <ItemProvider>
          <AppNavbar />
          <AppRoutes />
        </ItemProvider>
      </AuthProvider>
    </MemoryRouter>
  )

describe('AuthContext — phiên đăng nhập phải được giữ lại khi reload / truy cập trực tiếp URL', () => {
  beforeEach(() => {
    entityApi.fetchSuppliers.mockResolvedValue([{ id: '1', name: 'Standard' }])
    entityApi.fetchItems.mockResolvedValue([])
  })

  test('chưa từng đăng nhập → truy cập /suppliers/999 lần đầu sẽ về trang Login (đúng, không phải bug)', async () => {
    renderApp('/suppliers/999')
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    })
  })

  test('BUG ĐÃ FIX: đăng nhập thành công, sau đó "reload" (remount) tại /suppliers/999 → vẫn còn phiên đăng nhập, KHÔNG bị đưa về Login', async () => {
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
    // hành vi reload trang / dán URL /suppliers/999 vào thanh địa chỉ.
    unmount()
    renderApp('/suppliers/999')
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
    renderApp('/suppliers/999')
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    })
  })
})
