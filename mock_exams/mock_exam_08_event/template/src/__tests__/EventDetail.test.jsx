import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import EventDetail from '../pages/EventDetail'
import { EventContext } from '../context/EventContext'
import * as api from '../api/eventApi'

jest.mock('../api/eventApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  organizer: 'FPT Corp',
  duration: 4,
  priceWeekday: 2000000,
  priceWeekend: 2500000,
  eventDate: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    locations: [{ id: '1', name: 'StandardType' }],
    events: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchEventById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/events/5']}>
      <EventContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/events/:id" element={<EventDetail />} />
        </Routes>
      </EventContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
