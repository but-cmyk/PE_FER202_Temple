import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ManageAirlines from '../pages/ManageAirlines'
import { FlightContext } from '../context/FlightContext'
import * as api from '../api/flightApi'

jest.mock('../api/flightApi')

const mockTypes = [
  { id: '1', name: 'Type A' },
  { id: '2', name: 'Type B' }
]

const mockCtx = {
  state: {
    loading: false,
    error: null,
    airlines: mockTypes,
    flights: []
  },
  dispatch: jest.fn()
}

test('TODO-10A: validate không add trùng lặp và add hợp lệ', async () => {
  render(
    <MemoryRouter>
      <FlightContext.Provider value={mockCtx}>
        <ManageAirlines />
      </FlightContext.Provider>
    </MemoryRouter>
  )

  const input = screen.getByPlaceholderText(/e\.g\. Buffet/i)
  const addBtn = screen.getByRole('button', { name: /add/i })

  // Try duplicate
  fireEvent.change(input, { target: { value: 'Type A' } })
  fireEvent.click(addBtn)

  await waitFor(() => {
    expect(screen.getByRole('alert')).toHaveTextContent(/already exists/i)
  })
  expect(api.addAirline).not.toHaveBeenCalled()
})

test('TODO-10B: check in-use trước khi xóa', async () => {
  api.fetchFlights.mockResolvedValue([{ id: '10', name: 'Sub', airlineId: '1' }])

  render(
    <MemoryRouter>
      <FlightContext.Provider value={mockCtx}>
        <ManageAirlines />
      </FlightContext.Provider>
    </MemoryRouter>
  )

  const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
  fireEvent.click(deleteButtons[0]) // First is Type A (id: 1), which is in use

  // Modal confirm open
  const confirmBtn = screen.getAllByRole('button', { name: /Delete/i }).pop()
  fireEvent.click(confirmBtn)

  await waitFor(() => {
    expect(screen.getByRole('alert')).toHaveTextContent(/currently in use/i)
  })
  expect(api.deleteAirline).not.toHaveBeenCalled()
})
