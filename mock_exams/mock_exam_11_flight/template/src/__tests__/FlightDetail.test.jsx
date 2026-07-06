import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import FlightDetail from '../pages/FlightDetail'
import { FlightContext } from '../context/FlightContext'
import * as api from '../api/flightApi'

jest.mock('../api/flightApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  aircraft: 'Airbus A321',
  duration: 2,
  priceWeekday: 2000000,
  priceWeekend: 2500000,
  flightDate: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    airlines: [{ id: '1', name: 'StandardType' }],
    flights: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchFlightById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/flights/5']}>
      <FlightContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/flights/:id" element={<FlightDetail />} />
        </Routes>
      </FlightContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
