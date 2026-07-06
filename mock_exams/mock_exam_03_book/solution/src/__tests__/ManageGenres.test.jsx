import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ManageGenres from '../pages/ManageGenres'
import { BookContext } from '../context/BookContext'
import * as api from '../api/bookApi'

jest.mock('../api/bookApi')

const mockTypes = [
  { id: '1', name: 'Type A' },
  { id: '2', name: 'Type B' }
]

const mockCtx = {
  state: {
    loading: false,
    error: null,
    genres: mockTypes,
    books: []
  },
  dispatch: jest.fn()
}

test('TODO-10A: validate không add trùng lặp và add hợp lệ', async () => {
  render(
    <MemoryRouter>
      <BookContext.Provider value={mockCtx}>
        <ManageGenres />
      </BookContext.Provider>
    </MemoryRouter>
  )

  const input = screen.getByPlaceholderText(/e\.g\. Buffet/i)
  const addBtn = screen.getByRole('button', { name: /add/i })

  // Try duplicate
  fireEvent.change(input, { target: { value: 'Type A' } })
  fireEvent.click(addBtn)

  await waitFor(() => {
    expect(screen.getByRole('alert')).toHaveTextContent(/already exists/i)
  })
  expect(api.addGenre).not.toHaveBeenCalled()
})

test('TODO-10B: check in-use trước khi xóa', async () => {
  api.fetchBooks.mockResolvedValue([{ id: '10', name: 'Sub', genreId: '1' }])

  render(
    <MemoryRouter>
      <BookContext.Provider value={mockCtx}>
        <ManageGenres />
      </BookContext.Provider>
    </MemoryRouter>
  )

  const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
  fireEvent.click(deleteButtons[0]) // First is Type A (id: 1), which is in use

  // Modal confirm open
  const confirmBtn = screen.getAllByRole('button', { name: /Delete/i }).pop()
  fireEvent.click(confirmBtn)

  await waitFor(() => {
    expect(screen.getByRole('alert')).toHaveTextContent(/currently in use/i)
  })
  expect(api.deleteGenre).not.toHaveBeenCalled()
})
