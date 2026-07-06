import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RoomList from '../pages/RoomList'
import { RoomContext } from '../context/RoomContext'
import { AuthContext } from '../context/AuthContext'

const mockItems = [
  { id: '1', name: 'Alpha', bedType: 'x', capacity: 5, priceWeekday: 100000 },
  { id: '2', name: 'Beta', bedType: 'y', capacity: 10, priceWeekday: 50000 }
]

const mockCtx = {
  state: {
    loading: false,
    error: null,
    roomTypes: [],
    rooms: mockItems
  },
  dispatch: jest.fn()
}

const renderList = (role) =>
  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user: { role, email: 'x@test.com' }, isAuthenticated: true }}>
        <RoomContext.Provider value={mockCtx}>
          <RoomList />
        </RoomContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  )

test('TODO-01: hiển thị có điều kiện dựa trên role', () => {
  const { rerender } = renderList('User')
  expect(screen.queryByRole('button', { name: /add/i })).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()

  rerender(
    <MemoryRouter>
      <AuthContext.Provider value={{ user: { role: 'Admin' }, isAuthenticated: true }}>
        <RoomContext.Provider value={mockCtx}>
          <RoomList />
        </RoomContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  )
  expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
})

test('TODO-03: sắp xếp theo giá và chữ cái', () => {
  renderList('Admin')
  const select = screen.getByLabelText(/sort by/i)
  
  // Sort price asc -> Beta (50000) then Alpha (100000)
  fireEvent.change(select, { target: { value: 'price-asc' } })
  const rows = screen.getAllByRole('row').slice(1) // skip header
  expect(rows[0]).toHaveTextContent('Beta')
})
