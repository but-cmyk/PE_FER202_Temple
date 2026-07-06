import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddProperty from '../pages/AddProperty'
import { PropertyContext } from '../context/PropertyContext'
import * as api from '../api/propertyApi'

jest.mock('../api/propertyApi')

const mockCtx = {
  state: { loading: false, error: null, agents: [], properties: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchAgents.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addProperty.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <PropertyContext.Provider value={mockCtx}>
        <AddProperty />
      </PropertyContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'Agent')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('Price Base')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addProperty).toHaveBeenCalled()
  })
})
