import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import GymClassDetail from '../pages/GymClassDetail'
import { GymClassContext } from '../context/GymClassContext'
import * as api from '../api/gymClassApi'

jest.mock('../api/gymClassApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  level: 'Beginner',
  capacity: 20,
  priceWeekday: 2000000,
  priceWeekend: 2500000,
  startDate: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    trainers: [{ id: '1', name: 'StandardType' }],
    gymClasses: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchGymClassById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/gymClasses/5']}>
      <GymClassContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/gymClasses/:id" element={<GymClassDetail />} />
        </Routes>
      </GymClassContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
