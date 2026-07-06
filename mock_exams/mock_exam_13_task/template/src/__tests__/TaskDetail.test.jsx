import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import TaskDetail from '../pages/TaskDetail'
import { TaskContext } from '../context/TaskContext'
import * as api from '../api/taskApi'

jest.mock('../api/taskApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  priority: 'High',
  duration: 5,
  priceMin: 2000000,
  priceMax: 2500000,
  deadline: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    projects: [{ id: '1', name: 'StandardType' }],
    tasks: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchTaskById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/tasks/5']}>
      <TaskContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Routes>
      </TaskContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
