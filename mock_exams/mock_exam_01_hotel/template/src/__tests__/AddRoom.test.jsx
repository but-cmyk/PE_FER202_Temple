import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddRoom from '../pages/AddRoom'
import { RoomContext } from '../context/RoomContext'
import * as api from '../api/roomApi'

jest.mock('../api/roomApi')

const mockCtx = {
  state: { loading: false, error: null, roomTypes: [], rooms: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchRoomTypes.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addRoom.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <RoomContext.Provider value={mockCtx}>
        <AddRoom />
      </RoomContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'RoomType')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('Price Weekday')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addRoom).toHaveBeenCalled()
  })
})
