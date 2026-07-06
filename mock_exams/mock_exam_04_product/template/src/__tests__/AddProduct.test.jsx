import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddProduct from '../pages/AddProduct'
import { ProductContext } from '../context/ProductContext'
import * as api from '../api/productApi'

jest.mock('../api/productApi')

const mockCtx = {
  state: { loading: false, error: null, brands: [], products: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchBrands.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addProduct.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <ProductContext.Provider value={mockCtx}>
        <AddProduct />
      </ProductContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'Brand')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('Price Normal')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addProduct).toHaveBeenCalled()
  })
})
