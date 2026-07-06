import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import StudentDetail from '../pages/StudentDetail'
import { StudentContext } from '../context/StudentContext'
import * as api from '../api/studentApi'

jest.mock('../api/studentApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  major: 'Software Engineering',
  gpa: 3.5,
  priceMin: 2000000,
  priceMax: 2500000,
  enrollmentDate: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    departments: [{ id: '1', name: 'StandardType' }],
    students: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchStudentById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/students/5']}>
      <StudentContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/students/:id" element={<StudentDetail />} />
        </Routes>
      </StudentContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
