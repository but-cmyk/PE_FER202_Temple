import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddGymClass from '../pages/AddGymClass'
import { GymClassContext } from '../context/GymClassContext'
import * as api from '../api/gymClassApi'

jest.mock('../api/gymClassApi')

const mockCtx = {
  state: { loading: false, error: null, trainers: [], gymClasses: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchTrainers.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addGymClass.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <GymClassContext.Provider value={mockCtx}>
        <AddGymClass />
      </GymClassContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'Trainer')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('Weekday Fee')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addGymClass).toHaveBeenCalled()
  })
})
