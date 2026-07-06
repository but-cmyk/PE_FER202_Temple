import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AppointmentDetail from '../pages/AppointmentDetail'
import { AppointmentContext } from '../context/AppointmentContext'
import * as api from '../api/appointmentApi'

jest.mock('../api/appointmentApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  patient: 'Alex',
  duration: 30,
  priceMin: 2000000,
  priceMax: 2500000,
  appointmentDate: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    doctors: [{ id: '1', name: 'StandardType' }],
    appointments: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchAppointmentById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/appointments/5']}>
      <AppointmentContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/appointments/:id" element={<AppointmentDetail />} />
        </Routes>
      </AppointmentContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
