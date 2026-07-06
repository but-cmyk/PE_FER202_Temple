import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddEvent from '../pages/AddEvent'
import { EventContext } from '../context/EventContext'
import * as api from '../api/eventApi'

jest.mock('../api/eventApi')

const mockCtx = {
  state: { loading: false, error: null, locations: [], events: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchLocations.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addEvent.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <EventContext.Provider value={mockCtx}>
        <AddEvent />
      </EventContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'Location')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('Entry Price')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addEvent).toHaveBeenCalled()
  })
})
