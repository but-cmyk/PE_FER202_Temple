import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import MovieDetail from '../pages/MovieDetail'
import { MovieContext } from '../context/MovieContext'
import * as api from '../api/movieApi'

jest.mock('../api/movieApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  director: 'Christopher Nolan',
  duration: 120,
  priceMin: 2000000,
  priceMax: 2500000,
  releaseDate: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    categories: [{ id: '1', name: 'StandardType' }],
    movies: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchMovieById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/movies/5']}>
      <MovieContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/movies/:id" element={<MovieDetail />} />
        </Routes>
      </MovieContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
