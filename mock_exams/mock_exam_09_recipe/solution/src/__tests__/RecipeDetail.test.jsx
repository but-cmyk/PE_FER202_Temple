import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import RecipeDetail from '../pages/RecipeDetail'
import { RecipeContext } from '../context/RecipeContext'
import * as api from '../api/recipeApi'

jest.mock('../api/recipeApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  difficulty: 'Medium',
  prepTime: 30,
  priceMin: 2000000,
  priceMax: 2500000,
  createdDate: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    cuisines: [{ id: '1', name: 'StandardType' }],
    recipes: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchRecipeById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/recipes/5']}>
      <RecipeContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/recipes/:id" element={<RecipeDetail />} />
        </Routes>
      </RecipeContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
