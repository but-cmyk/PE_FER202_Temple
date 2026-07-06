import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddEmployee from '../pages/AddEmployee'
import { EmployeeContext } from '../context/EmployeeContext'
import * as api from '../api/employeeApi'

jest.mock('../api/employeeApi')

const mockCtx = {
  state: { loading: false, error: null, departments: [], employees: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchDepartments.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addEmployee.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <EmployeeContext.Provider value={mockCtx}>
        <AddEmployee />
      </EmployeeContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'Department')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('Monthly Salary')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addEmployee).toHaveBeenCalled()
  })
})
