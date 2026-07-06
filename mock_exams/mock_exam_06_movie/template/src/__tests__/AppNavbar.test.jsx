import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import AppNavbar from '../components/AppNavbar'
import about from '../data/about'

const mockUser = {
  fullName: 'Test FullName',
  email: 'test@email.com',
  username: 'testuser',
  role: 'Admin'
}

const renderNavbar = (userVal, authenticatedVal) =>
  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user: userVal, isAuthenticated: authenticatedVal, logoutUser: jest.fn() }}>
        <AppNavbar />
      </AuthContext.Provider>
    </MemoryRouter>
  )

test('TODO-02: hiển thị thông tin người dùng và Badge role trên Navbar', () => {
  renderNavbar(mockUser, true)
  const expectedText = 'testuser'
  expect(screen.getByText(new RegExp(expectedText))).toBeInTheDocument()
  expect(screen.getByText('Admin')).toBeInTheDocument()
})

test('TODO-03: nút Logout xuất hiện và gọi handleLogout khi click', () => {
  const logoutMock = jest.fn()
  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user: mockUser, isAuthenticated: true, logoutUser: logoutMock }}>
        <AppNavbar />
      </AuthContext.Provider>
    </MemoryRouter>
  )
  const logoutBtn = screen.getByRole('button', { name: /logout/i })
  expect(logoutBtn).toBeInTheDocument()
  fireEvent.click(logoutBtn)
  expect(logoutMock).toHaveBeenCalled()
})

test('TODO-04: Click Brand logo navigate về /', () => {
  renderNavbar(null, false)
  const brandLink = screen.getByText(about.appName).closest('a')
  expect(brandLink).toHaveAttribute('href', '/')
})
