import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AirlineDetail from '../pages/AirlineDetail'
import * as api from '../api/flightApi'

jest.mock('../api/flightApi')

const mockTypes = [{ id: '1', name: 'Type ABC' }]
const mockItems = [{ id: '2', name: 'Item ABC', airlineId: '1', aircraft: 'val', duration: 10, priceWeekday: 50000 }]

test('TODO-09: fetch song song bằng Promise.all và render', async () => {
  api.fetchAirlines.mockResolvedValue(mockTypes)
  api.fetchFlights.mockResolvedValue(mockItems)

  render(
    <MemoryRouter initialEntries={['/airlines/1']}>
      <Routes>
        <Route path="/airlines/:id" element={<AirlineDetail />} />
      </Routes>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByText('Type ABC')).toBeInTheDocument()
  })
  expect(screen.getByText('Item ABC')).toBeInTheDocument()
})
