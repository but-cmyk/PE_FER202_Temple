import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import LocationDetail from '../pages/LocationDetail'
import * as api from '../api/eventApi'

jest.mock('../api/eventApi')

const mockTypes = [{ id: '1', name: 'Type ABC' }]
const mockItems = [{ id: '2', name: 'Item ABC', locationId: '1', organizer: 'val', duration: 10, priceWeekday: 50000 }]

test('TODO-09: fetch song song bằng Promise.all và render', async () => {
  api.fetchLocations.mockResolvedValue(mockTypes)
  api.fetchEvents.mockResolvedValue(mockItems)

  render(
    <MemoryRouter initialEntries={['/locations/1']}>
      <Routes>
        <Route path="/locations/:id" element={<LocationDetail />} />
      </Routes>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByText('Type ABC')).toBeInTheDocument()
  })
  expect(screen.getByText('Item ABC')).toBeInTheDocument()
})
