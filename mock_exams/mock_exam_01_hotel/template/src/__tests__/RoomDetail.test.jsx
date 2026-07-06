import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import RoomDetail from '../pages/RoomDetail'
import { RoomContext } from '../context/RoomContext'
import * as api from '../api/roomApi'

jest.mock('../api/roomApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  bedType: 'King',
  capacity: 2,
  priceWeekday: 2000000,
  priceWeekend: 2500000,
  lastServiced: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    roomTypes: [{ id: '1', name: 'StandardType' }],
    rooms: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchRoomById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/rooms/5']}>
      <RoomContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/rooms/:id" element={<RoomDetail />} />
        </Routes>
      </RoomContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
