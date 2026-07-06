import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddMovie from '../pages/AddMovie'
import { MovieContext } from '../context/MovieContext'
import * as api from '../api/movieApi'

jest.mock('../api/movieApi')

const mockCtx = {
  state: { loading: false, error: null, categories: [], movies: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchCategories.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addMovie.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <MovieContext.Provider value={mockCtx}>
        <AddMovie />
      </MovieContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'Category')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('Ticket Normal')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addMovie).toHaveBeenCalled()
  })
})
