import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import RoomTypeDetail from '../pages/RoomTypeDetail'
import * as api from '../api/roomApi'

jest.mock('../api/roomApi')

const mockTypes = [{ id: '1', name: 'Type ABC' }]
const mockItems = [{ id: '2', name: 'Item ABC', roomTypeId: '1', bedType: 'val', capacity: 10, priceWeekday: 50000 }]

test('TODO-09: fetch song song bằng Promise.all và render', async () => {
  api.fetchRoomTypes.mockResolvedValue(mockTypes)
  api.fetchRooms.mockResolvedValue(mockItems)

  render(
    <MemoryRouter initialEntries={['/roomTypes/1']}>
      <Routes>
        <Route path="/roomTypes/:id" element={<RoomTypeDetail />} />
      </Routes>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByText('Type ABC')).toBeInTheDocument()
  })
  expect(screen.getByText('Item ABC')).toBeInTheDocument()
})
