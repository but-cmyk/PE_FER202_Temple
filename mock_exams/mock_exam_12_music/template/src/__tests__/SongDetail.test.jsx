import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import SongDetail from '../pages/SongDetail'
import { SongContext } from '../context/SongContext'
import * as api from '../api/songApi'

jest.mock('../api/songApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  album: 'The Album',
  plays: 100,
  priceWeekday: 2000000,
  priceWeekend: 2500000,
  releaseDate: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    artists: [{ id: '1', name: 'StandardType' }],
    songs: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchSongById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/songs/5']}>
      <SongContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/songs/:id" element={<SongDetail />} />
        </Routes>
      </SongContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
