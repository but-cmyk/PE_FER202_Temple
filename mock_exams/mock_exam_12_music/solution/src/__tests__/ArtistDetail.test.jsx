import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ArtistDetail from '../pages/ArtistDetail'
import * as api from '../api/songApi'

jest.mock('../api/songApi')

const mockTypes = [{ id: '1', name: 'Type ABC' }]
const mockItems = [{ id: '2', name: 'Item ABC', artistId: '1', album: 'val', plays: 10, priceWeekday: 50000 }]

test('TODO-09: fetch song song bằng Promise.all và render', async () => {
  api.fetchArtists.mockResolvedValue(mockTypes)
  api.fetchSongs.mockResolvedValue(mockItems)

  render(
    <MemoryRouter initialEntries={['/artists/1']}>
      <Routes>
        <Route path="/artists/:id" element={<ArtistDetail />} />
      </Routes>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByText('Type ABC')).toBeInTheDocument()
  })
  expect(screen.getByText('Item ABC')).toBeInTheDocument()
})
