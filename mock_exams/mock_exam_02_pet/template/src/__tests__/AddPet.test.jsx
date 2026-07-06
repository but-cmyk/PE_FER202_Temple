import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddPet from '../pages/AddPet'
import { PetContext } from '../context/PetContext'
import * as api from '../api/petApi'

jest.mock('../api/petApi')

const mockCtx = {
  state: { loading: false, error: null, breeds: [], pets: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchBreeds.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addPet.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <PetContext.Provider value={mockCtx}>
        <AddPet />
      </PetContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'Breed')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('Weekday Fee')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addPet).toHaveBeenCalled()
  })
})
