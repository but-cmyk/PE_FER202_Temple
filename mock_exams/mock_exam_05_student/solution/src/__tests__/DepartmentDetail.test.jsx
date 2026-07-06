import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import DepartmentDetail from '../pages/DepartmentDetail'
import * as api from '../api/studentApi'

jest.mock('../api/studentApi')

const mockTypes = [{ id: '1', name: 'Type ABC' }]
const mockItems = [{ id: '2', name: 'Item ABC', departmentId: '1', major: 'val', gpa: 10, priceMin: 50000 }]

test('TODO-09: fetch song song bằng Promise.all và render', async () => {
  api.fetchDepartments.mockResolvedValue(mockTypes)
  api.fetchStudents.mockResolvedValue(mockItems)

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
