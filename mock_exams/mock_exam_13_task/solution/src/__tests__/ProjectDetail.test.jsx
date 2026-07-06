import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProjectDetail from '../pages/ProjectDetail'
import * as api from '../api/taskApi'

jest.mock('../api/taskApi')

const mockTypes = [{ id: '1', name: 'Type ABC' }]
const mockItems = [{ id: '2', name: 'Item ABC', projectId: '1', priority: 'val', duration: 10, priceMin: 50000 }]

test('TODO-09: fetch song song bằng Promise.all và render', async () => {
  api.fetchProjects.mockResolvedValue(mockTypes)
  api.fetchTasks.mockResolvedValue(mockItems)

  render(
    <MemoryRouter initialEntries={['/projects/1']}>
      <Routes>
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByText('Type ABC')).toBeInTheDocument()
  })
  expect(screen.getByText('Item ABC')).toBeInTheDocument()
})
