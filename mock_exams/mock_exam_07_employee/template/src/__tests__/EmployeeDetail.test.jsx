import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import EmployeeDetail from '../pages/EmployeeDetail'
import { EmployeeContext } from '../context/EmployeeContext'
import * as api from '../api/employeeApi'

jest.mock('../api/employeeApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  role: 'Senior Dev',
  experience: 5,
  priceWeekday: 2000000,
  priceWeekend: 2500000,
  startDate: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    departments: [{ id: '1', name: 'StandardType' }],
    employees: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchEmployeeById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/employees/5']}>
      <EmployeeContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/employees/:id" element={<EmployeeDetail />} />
        </Routes>
      </EmployeeContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
