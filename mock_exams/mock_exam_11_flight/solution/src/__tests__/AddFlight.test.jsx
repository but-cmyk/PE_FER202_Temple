import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddFlight from '../pages/AddFlight'
import { FlightContext } from '../context/FlightContext'
import * as api from '../api/flightApi'

jest.mock('../api/flightApi')

const mockCtx = {
  state: { loading: false, error: null, airlines: [], flights: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchAirlines.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addFlight.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <FlightContext.Provider value={mockCtx}>
        <AddFlight />
      </FlightContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'Airline')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('Eco Price')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addFlight).toHaveBeenCalled()
  })
})
