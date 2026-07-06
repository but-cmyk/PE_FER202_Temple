import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import DoctorDetail from '../pages/DoctorDetail'
import * as api from '../api/appointmentApi'

jest.mock('../api/appointmentApi')

const mockTypes = [{ id: '1', name: 'Type ABC' }]
const mockItems = [{ id: '2', name: 'Item ABC', doctorId: '1', patient: 'val', duration: 10, priceMin: 50000 }]

test('TODO-09: fetch song song bằng Promise.all và render', async () => {
  api.fetchDoctors.mockResolvedValue(mockTypes)
  api.fetchAppointments.mockResolvedValue(mockItems)

  render(
    <MemoryRouter initialEntries={['/doctors/1']}>
      <Routes>
        <Route path="/doctors/:id" element={<DoctorDetail />} />
      </Routes>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByText('Type ABC')).toBeInTheDocument()
  })
  expect(screen.getByText('Item ABC')).toBeInTheDocument()
})
