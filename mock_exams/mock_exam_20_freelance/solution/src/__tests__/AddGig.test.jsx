import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddGig from '../pages/AddGig'
import { GigContext } from '../context/GigContext'
import * as api from '../api/gigApi'

jest.mock('../api/gigApi')

const mockCtx = {
  state: { loading: false, error: null, categories: [], gigs: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchCategories.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addGig.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <GigContext.Provider value={mockCtx}>
        <AddGig />
      </GigContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'Category')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('Price Min')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addGig).toHaveBeenCalled()
  })
})
