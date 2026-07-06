import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddCar from '../pages/AddCar'
import { CarContext } from '../context/CarContext'
import * as api from '../api/carApi'

jest.mock('../api/carApi')

const mockCtx = {
  state: { loading: false, error: null, dealers: [], cars: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchDealers.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addCar.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <CarContext.Provider value={mockCtx}>
        <AddCar />
      </CarContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'Dealer')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('MSRP Price')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addCar).toHaveBeenCalled()
  })
})
