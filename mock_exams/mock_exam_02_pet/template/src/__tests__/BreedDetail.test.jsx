import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import BreedDetail from '../pages/BreedDetail'
import * as api from '../api/petApi'

jest.mock('../api/petApi')

const mockTypes = [{ id: '1', name: 'Type ABC' }]
const mockItems = [{ id: '2', name: 'Item ABC', breedId: '1', owner: 'val', age: 10, priceWeekday: 50000 }]

test('TODO-09: fetch song song bằng Promise.all và render', async () => {
  api.fetchBreeds.mockResolvedValue(mockTypes)
  api.fetchPets.mockResolvedValue(mockItems)

  render(
    <MemoryRouter initialEntries={['/breeds/1']}>
      <Routes>
        <Route path="/breeds/:id" element={<BreedDetail />} />
      </Routes>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByText('Type ABC')).toBeInTheDocument()
  })
  expect(screen.getByText('Item ABC')).toBeInTheDocument()
})
