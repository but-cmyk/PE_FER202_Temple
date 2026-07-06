import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddTask from '../pages/AddTask'
import { TaskContext } from '../context/TaskContext'
import * as api from '../api/taskApi'

jest.mock('../api/taskApi')

const mockCtx = {
  state: { loading: false, error: null, projects: [], tasks: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchProjects.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addTask.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <TaskContext.Provider value={mockCtx}>
        <AddTask />
      </TaskContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'Project')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('Estimated Cost')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addTask).toHaveBeenCalled()
  })
})
