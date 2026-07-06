import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ModuleDetail from '../pages/ModuleDetail'
import * as api from '../api/lessonApi'

jest.mock('../api/lessonApi')

const mockTypes = [{ id: '1', name: 'Type ABC' }]
const mockItems = [{ id: '2', name: 'Item ABC', moduleId: '1', type: 'val', duration: 10, priceMin: 50000 }]

test('TODO-09: fetch song song bằng Promise.all và render', async () => {
  api.fetchModules.mockResolvedValue(mockTypes)
  api.fetchLessons.mockResolvedValue(mockItems)

  render(
    <MemoryRouter initialEntries={['/modules/1']}>
      <Routes>
        <Route path="/modules/:id" element={<ModuleDetail />} />
      </Routes>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByText('Type ABC')).toBeInTheDocument()
  })
  expect(screen.getByText('Item ABC')).toBeInTheDocument()
})
