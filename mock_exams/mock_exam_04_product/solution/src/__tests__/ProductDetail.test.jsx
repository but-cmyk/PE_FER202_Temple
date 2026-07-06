import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProductDetail from '../pages/ProductDetail'
import { ProductContext } from '../context/ProductContext'
import * as api from '../api/productApi'

jest.mock('../api/productApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  model: 'A2633',
  warranty: 12,
  priceWeekday: 2000000,
  priceWeekend: 2500000,
  releaseDate: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    brands: [{ id: '1', name: 'StandardType' }],
    products: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchProductById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/products/5']}>
      <ProductContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </ProductContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
