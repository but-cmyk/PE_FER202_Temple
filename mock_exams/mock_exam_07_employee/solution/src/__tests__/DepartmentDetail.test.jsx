import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import DepartmentDetail from '../pages/DepartmentDetail'
import * as api from '../api/employeeApi'

jest.mock('../api/employeeApi')

const mockTypes = [{ id: '1', name: 'Type ABC' }]
const mockItems = [{ id: '2', name: 'Item ABC', departmentId: '1', role: 'val', experience: 10, priceWeekday: 50000 }]

test('TODO-09: fetch song song bằng Promise.all và render', async () => {
  api.fetchDepartments.mockResolvedValue(mockTypes)
  api.fetchEmployees.mockResolvedValue(mockItems)

  render(
    <MemoryRouter initialEntries={['/departments/1']}>
      <Routes>
        <Route path="/departments/:id" element={<DepartmentDetail />} />
      </Routes>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByText('Type ABC')).toBeInTheDocument()
  })
  expect(screen.getByText('Item ABC')).toBeInTheDocument()
})
