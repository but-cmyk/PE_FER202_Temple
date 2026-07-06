import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddJob from '../pages/AddJob'
import { JobContext } from '../context/JobContext'
import * as api from '../api/jobApi'

jest.mock('../api/jobApi')

const mockCtx = {
  state: { loading: false, error: null, companies: [], jobs: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchCompanies.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addJob.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <JobContext.Provider value={mockCtx}>
        <AddJob />
      </JobContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'Company')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('Salary Min')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addJob).toHaveBeenCalled()
  })
})
