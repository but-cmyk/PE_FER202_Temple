import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddLesson from '../pages/AddLesson'
import { LessonContext } from '../context/LessonContext'
import * as api from '../api/lessonApi'

jest.mock('../api/lessonApi')

const mockCtx = {
  state: { loading: false, error: null, modules: [], lessons: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetchModules.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.addLesson.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <LessonContext.Provider value={mockCtx}>
        <AddLesson />
      </LessonContext.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : 'Module')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('Access Fee Min')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.addLesson).toHaveBeenCalled()
  })
})
