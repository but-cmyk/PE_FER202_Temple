import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import PropertyDetail from '../pages/PropertyDetail'
import { PropertyContext } from '../context/PropertyContext'
import * as api from '../api/propertyApi'

jest.mock('../api/propertyApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  status: 'Available',
  area: 75,
  priceMin: 2000000,
  priceMax: 2500000,
  listedDate: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    agents: [{ id: '1', name: 'StandardType' }],
    properties: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchPropertyById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/properties/5']}>
      <PropertyContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/properties/:id" element={<PropertyDetail />} />
        </Routes>
      </PropertyContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
