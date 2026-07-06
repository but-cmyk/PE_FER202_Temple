import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import BrandDetail from '../pages/BrandDetail'
import * as api from '../api/productApi'

jest.mock('../api/productApi')

const mockTypes = [{ id: '1', name: 'Type ABC' }]
const mockItems = [{ id: '2', name: 'Item ABC', brandId: '1', model: 'val', warranty: 10, priceWeekday: 50000 }]

test('TODO-09: fetch song song bằng Promise.all và render', async () => {
  api.fetchBrands.mockResolvedValue(mockTypes)
  api.fetchProducts.mockResolvedValue(mockItems)

  render(
    <MemoryRouter initialEntries={['/brands/1']}>
      <Routes>
        <Route path="/brands/:id" element={<BrandDetail />} />
      </Routes>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByText('Type ABC')).toBeInTheDocument()
  })
  expect(screen.getByText('Item ABC')).toBeInTheDocument()
})
