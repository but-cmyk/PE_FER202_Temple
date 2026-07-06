import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddRecipe from '../pages/AddRecipe'
import { RecipeContext } from '../context/RecipeContext'
import * as api from '../api/recipeApi'

jest.mock('../api/recipeApi')

const mockCtx = {
  state: { loading: false, error: null, cuisines: [], recipes: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchCuisines.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addRecipe.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <RecipeContext.Provider value={mockCtx}>
        <AddRecipe />
      </RecipeContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'Cuisine')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('Cost Min')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addRecipe).toHaveBeenCalled()
  })
})
