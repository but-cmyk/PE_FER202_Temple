import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddAppointment from '../pages/AddAppointment'
import { AppointmentContext } from '../context/AppointmentContext'
import * as api from '../api/appointmentApi'

jest.mock('../api/appointmentApi')

const mockCtx = {
  state: { loading: false, error: null, doctors: [], appointments: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchDoctors.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addAppointment.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <AppointmentContext.Provider value={mockCtx}>
        <AddAppointment />
      </AppointmentContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'Doctor')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('Fee Normal')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addAppointment).toHaveBeenCalled()
  })
})
