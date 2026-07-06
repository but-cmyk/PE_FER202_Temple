import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BookRow from '../components/BookRow'
import { formatVND } from '../utils/format'

const mockItem = {
  id: '99',
  name: 'Test Entity Name',
  author: 'J.K. Rowling',
  pages: 350,
  priceMin: 1200000,
  priceMax: 1500000,
  publishedDate: '12/12/2026'
}

test('TODO-06: hiển thị modal xác nhận và gọi onDelete khi click confirm', () => {
  const deleteMock = jest.fn()
  render(
    <MemoryRouter>
      <table>
        <tbody>
          <BookRow
            book={mockItem}
            index={0}
            onDelete={deleteMock}
            canManage={true}
          />
        </tbody>
      </table>
    </MemoryRouter>
  )

  const delBtn = screen.getByRole('button', { name: /delete/i })
  fireEvent.click(delBtn)

  // Modal must be open
  expect(screen.getByText('Confirm Delete')).toBeInTheDocument()
  expect(screen.getAllByText(/Test Entity Name/).length).toBeGreaterThan(0)

  // Click confirm
  const confirmBtn = screen.getAllByRole('button', { name: /Delete/i })[1]
  fireEvent.click(confirmBtn)
  expect(deleteMock).toHaveBeenCalledWith('99')
})

test('TODO-07: hiển thị đúng định dạng VND cho cột giá', () => {
  render(
    <MemoryRouter>
      <table>
        <tbody>
          <BookRow
            book={mockItem}
            index={0}
            onDelete={jest.fn()}
            canManage={true}
          />
        </tbody>
      </table>
    </MemoryRouter>
  )
  expect(screen.getByText(/1\.200\.000|1,200,000/)).toBeInTheDocument()
})
