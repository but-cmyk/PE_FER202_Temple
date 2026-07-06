import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import SupplierDetail from '../pages/SupplierDetail'
import * as api from '../api/itemApi'

jest.mock('../api/itemApi')

const mockTypes = [{ id: '1', name: 'Type ABC' }]
const mockItems = [{ id: '2', name: 'Item ABC', supplierId: '1', unit: 'val', stock: 10, priceWeekday: 50000 }]

test('TODO-09: fetch song song bằng Promise.all và render', async () => {
  api.fetchSuppliers.mockResolvedValue(mockTypes)
  api.fetchItems.mockResolvedValue(mockItems)

  render(
    <MemoryRouter initialEntries={['/suppliers/1']}>
      <Routes>
        <Route path="/suppliers/:id" element={<SupplierDetail />} />
      </Routes>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByText('Type ABC')).toBeInTheDocument()
  })
  expect(screen.getByText('Item ABC')).toBeInTheDocument()
})
