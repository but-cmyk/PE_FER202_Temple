import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import JobDetail from '../pages/JobDetail'
import { JobContext } from '../context/JobContext'
import * as api from '../api/jobApi'

jest.mock('../api/jobApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  location: 'Hanoi',
  experience: 2,
  priceMin: 2000000,
  priceMax: 2500000,
  postedDate: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    companies: [{ id: '1', name: 'StandardType' }],
    jobs: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchJobById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/jobs/5']}>
      <JobContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/jobs/:id" element={<JobDetail />} />
        </Routes>
      </JobContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
