import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddStudent from '../pages/AddStudent'
import { StudentContext } from '../context/StudentContext'
import * as api from '../api/studentApi'

jest.mock('../api/studentApi')

const mockCtx = {
  state: { loading: false, error: null, departments: [], students: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchDepartments.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addStudent.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <StudentContext.Provider value={mockCtx}>
        <AddStudent />
      </StudentContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'Department')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('Tuition Min')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addStudent).toHaveBeenCalled()
  })
})
