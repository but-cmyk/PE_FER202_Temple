import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import BookDetail from '../pages/BookDetail'
import { BookContext } from '../context/BookContext'
import * as api from '../api/bookApi'

jest.mock('../api/bookApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  author: 'J.K. Rowling',
  pages: 350,
  priceMin: 2000000,
  priceMax: 2500000,
  publishedDate: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    genres: [{ id: '1', name: 'StandardType' }],
    books: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchBookById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/books/5']}>
      <BookContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/books/:id" element={<BookDetail />} />
        </Routes>
      </BookContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
