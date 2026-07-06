import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CuisineDetail from '../pages/CuisineDetail'
import * as api from '../api/recipeApi'

jest.mock('../api/recipeApi')

const mockTypes = [{ id: '1', name: 'Type ABC' }]
const mockItems = [{ id: '2', name: 'Item ABC', cuisineId: '1', difficulty: 'val', prepTime: 10, priceMin: 50000 }]

test('TODO-09: fetch song song bằng Promise.all và render', async () => {
  api.fetchCuisines.mockResolvedValue(mockTypes)
  api.fetchRecipes.mockResolvedValue(mockItems)

  render(
    <MemoryRouter initialEntries={['/cuisines/1']}>
      <Routes>
        <Route path="/cuisines/:id" element={<CuisineDetail />} />
      </Routes>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByText('Type ABC')).toBeInTheDocument()
  })
  expect(screen.getByText('Item ABC')).toBeInTheDocument()
})
