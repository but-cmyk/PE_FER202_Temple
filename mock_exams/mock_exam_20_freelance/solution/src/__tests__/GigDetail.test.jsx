import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import GigDetail from '../pages/GigDetail'
import { GigContext } from '../context/GigContext'
import * as api from '../api/gigApi'

jest.mock('../api/gigApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  level: 'Top Rated',
  delivery: 5,
  priceMin: 2000000,
  priceMax: 2500000,
  createdDate: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    categories: [{ id: '1', name: 'StandardType' }],
    gigs: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchGigById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/gigs/5']}>
      <GigContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/gigs/:id" element={<GigDetail />} />
        </Routes>
      </GigContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
