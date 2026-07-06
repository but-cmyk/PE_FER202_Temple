import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddSong from '../pages/AddSong'
import { SongContext } from '../context/SongContext'
import * as api from '../api/songApi'

jest.mock('../api/songApi')

const mockCtx = {
  state: { loading: false, error: null, artists: [], songs: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchArtists.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addSong.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <SongContext.Provider value={mockCtx}>
        <AddSong />
      </SongContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'Artist')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('Production Cost')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addSong).toHaveBeenCalled()
  })
})
