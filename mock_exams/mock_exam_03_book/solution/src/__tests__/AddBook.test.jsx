import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddBook from '../pages/AddBook'
import { BookContext } from '../context/BookContext'
import * as api from '../api/bookApi'

jest.mock('../api/bookApi')

const mockCtx = {
  state: { loading: false, error: null, genres: [], books: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchGenres.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addBook.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <BookContext.Provider value={mockCtx}>
        <AddBook />
      </BookContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'Genre')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('Price Min')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addBook).toHaveBeenCalled()
  })
})
