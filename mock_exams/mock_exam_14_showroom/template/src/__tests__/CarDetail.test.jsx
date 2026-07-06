import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CarDetail from '../pages/CarDetail'
import { CarContext } from '../context/CarContext'
import * as api from '../api/carApi'

jest.mock('../api/carApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  engine: 'V6 Turbo',
  year: 2024,
  priceWeekday: 2000000,
  priceWeekend: 2500000,
  receivedDate: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    dealers: [{ id: '1', name: 'StandardType' }],
    cars: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchCarById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/cars/5']}>
      <CarContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/cars/:id" element={<CarDetail />} />
        </Routes>
      </CarContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
