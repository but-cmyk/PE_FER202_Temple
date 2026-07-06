import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CategoryDetail from '../pages/CategoryDetail'
import * as api from '../api/gigApi'

jest.mock('../api/gigApi')

const mockTypes = [{ id: '1', name: 'Type ABC' }]
const mockItems = [{ id: '2', name: 'Item ABC', categoryId: '1', level: 'val', delivery: 10, priceMin: 50000 }]

test('TODO-09: fetch song song bằng Promise.all và render', async () => {
  api.fetchCategories.mockResolvedValue(mockTypes)
  api.fetchGigs.mockResolvedValue(mockItems)

  render(
    <MemoryRouter initialEntries={['/categories/1']}>
      <Routes>
        <Route path="/categories/:id" element={<CategoryDetail />} />
      </Routes>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByText('Type ABC')).toBeInTheDocument()
  })
  expect(screen.getByText('Item ABC')).toBeInTheDocument()
})
