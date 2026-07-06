import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddItem from '../pages/AddItem'
import { ItemContext } from '../context/ItemContext'
import * as api from '../api/itemApi'

jest.mock('../api/itemApi')

const mockCtx = {
  state: { loading: false, error: null, suppliers: [], items: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchSuppliers.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addItem.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <ItemContext.Provider value={mockCtx}>
        <AddItem />
      </ItemContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'Supplier')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('Cost Price')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addItem).toHaveBeenCalled()
  })
})
