import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ManageLocations from '../pages/ManageLocations'
import { EventContext } from '../context/EventContext'
import * as api from '../api/eventApi'

jest.mock('../api/eventApi')

const mockTypes = [
  { id: '1', name: 'Type A' },
  { id: '2', name: 'Type B' }
]

const mockCtx = {
  state: {
    loading: false,
    error: null,
    locations: mockTypes,
    events: []
  },
  dispatch: jest.fn()
}

test('TODO-10A: validate không add trùng lặp và add hợp lệ', async () => {
  render(
    <MemoryRouter>
      <EventContext.Provider value={mockCtx}>
        <ManageLocations />
      </EventContext.Provider>
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
  expect(api.addLocation).not.toHaveBeenCalled()
})

test('TODO-10B: check in-use trước khi xóa', async () => {
  api.fetchEvents.mockResolvedValue([{ id: '10', name: 'Sub', locationId: '1' }])

  render(
    <MemoryRouter>
      <EventContext.Provider value={mockCtx}>
        <ManageLocations />
      </EventContext.Provider>
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
  expect(api.deleteLocation).not.toHaveBeenCalled()
})
