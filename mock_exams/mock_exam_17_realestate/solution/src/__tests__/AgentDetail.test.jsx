import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AgentDetail from '../pages/AgentDetail'
import * as api from '../api/propertyApi'

jest.mock('../api/propertyApi')

const mockTypes = [{ id: '1', name: 'Type ABC' }]
const mockItems = [{ id: '2', name: 'Item ABC', agentId: '1', status: 'val', area: 10, priceMin: 50000 }]

test('TODO-09: fetch song song bằng Promise.all và render', async () => {
  api.fetchAgents.mockResolvedValue(mockTypes)
  api.fetchProperties.mockResolvedValue(mockItems)

  render(
    <MemoryRouter initialEntries={['/agents/1']}>
      <Routes>
        <Route path="/agents/:id" element={<AgentDetail />} />
      </Routes>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByText('Type ABC')).toBeInTheDocument()
  })
  expect(screen.getByText('Item ABC')).toBeInTheDocument()
})
