import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ItemDetail from '../pages/ItemDetail'
import { ItemContext } from '../context/ItemContext'
import * as api from '../api/itemApi'

jest.mock('../api/itemApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  unit: 'Bottle',
  stock: 50,
  priceWeekday: 2000000,
  priceWeekend: 2500000,
  expiryDate: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    suppliers: [{ id: '1', name: 'StandardType' }],
    items: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchItemById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/items/5']}>
      <ItemContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/items/:id" element={<ItemDetail />} />
        </Routes>
      </ItemContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
