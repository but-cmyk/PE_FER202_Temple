import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import LessonDetail from '../pages/LessonDetail'
import { LessonContext } from '../context/LessonContext'
import * as api from '../api/lessonApi'

jest.mock('../api/lessonApi')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  type: 'Video',
  duration: 15,
  priceMin: 2000000,
  priceMax: 2500000,
  releasedDate: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    modules: [{ id: '1', name: 'StandardType' }],
    lessons: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetchLessonById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/lessons/5']}>
      <LessonContext.Provider value={mockCtx}>
        <Routes>
          <Route path="/lessons/:id" element={<LessonDetail />} />
        </Routes>
      </LessonContext.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
