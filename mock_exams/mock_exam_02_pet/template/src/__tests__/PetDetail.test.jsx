import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import PetDetail from '../pages/PetDetail'
import { PetContext } from '../context/PetContext'
import * as api from '../api/petApi'

jest.mock('../api/petApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  owner: 'John Doe',
  age: 12,
  priceWeekday: 2000000,
  priceWeekend: 2500000,
  lastVaccinated: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    breeds: [{ id: '1', name: 'StandardType' }],
    pets: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchPetById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/pets/5']}>
      <PetContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/pets/:id" element={<PetDetail />} />
        </Routes>
      </PetContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
