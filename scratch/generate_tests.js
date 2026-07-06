const fs = require('fs');
const path = require('path');

function generateLoginTest(d) {
  return `import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Login from '../pages/Login'
import { AuthProvider } from '../context/AuthContext'

const mock = new MockAdapter(axios)

const renderLogin = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  )

afterEach(() => mock.reset())

test('TODO-01: hiển thị alert lỗi khi đăng nhập sai', async () => {
  mock.onGet(/\\/users/).reply(200, [
    { id: '1', username: 'admin', password: 'admin123', role: 'Admin' }
  ])

  renderLogin()

  fireEvent.change(screen.getByPlaceholderText(/Enter username/i), {
    target: { value: 'admin' },
  })
  fireEvent.change(screen.getByPlaceholderText(/Enter password/i), {
    target: { value: 'wrongpass' },
  })
  fireEvent.click(screen.getByRole('button', { name: /login/i }))

  await waitFor(() => {
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})

test('TODO-01: không hiển thị alert khi form mới load', () => {
  renderLogin()
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
})
`;
}

function generateNavbarTest(d) {
  return `import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import AppNavbar from '../components/AppNavbar'
import about from '../data/about'

const mockUser = {
  fullName: 'Test FullName',
  email: 'test@email.com',
  username: 'testuser',
  role: 'Admin'
}

const renderNavbar = (userVal, authenticatedVal) =>
  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user: userVal, isAuthenticated: authenticatedVal, logoutUser: jest.fn() }}>
        <AppNavbar />
      </AuthContext.Provider>
    </MemoryRouter>
  )

test('TODO-02: hiển thị thông tin người dùng và Badge role trên Navbar', () => {
  renderNavbar(mockUser, true)
  const expectedText = '${d.navbarStyle === 'N1' ? 'Test FullName' : d.navbarStyle === 'N2' ? 'test@email.com' : 'testuser'}'
  expect(screen.getByText(new RegExp(expectedText))).toBeInTheDocument()
  expect(screen.getByText('Admin')).toBeInTheDocument()
})

test('TODO-03: nút Logout xuất hiện và gọi handleLogout khi click', () => {
  const logoutMock = jest.fn()
  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user: mockUser, isAuthenticated: true, logoutUser: logoutMock }}>
        <AppNavbar />
      </AuthContext.Provider>
    </MemoryRouter>
  )
  const logoutBtn = screen.getByRole('button', { name: /logout/i })
  expect(logoutBtn).toBeInTheDocument()
  fireEvent.click(logoutBtn)
  expect(logoutMock).toHaveBeenCalled()
})

test('TODO-04: Click Brand logo navigate về /', () => {
  renderNavbar(null, false)
  const brandLink = screen.getByText(about.appName).closest('a')
  expect(brandLink).toHaveAttribute('href', '/')
})
`;
}

function generateFooterTest(d) {
  return `import { render, screen } from '@testing-library/react'
import AppFooter from '../components/AppFooter'
import about from '../data/about'

test('TODO-08: footer hiển thị copyright và version từ about.js', () => {
  const { container } = render(<AppFooter />)
  expect(container.querySelector('footer')).toBeInTheDocument()
  expect(screen.getByText(new RegExp(about.copyright.replace('©', '\\\\©')))).toBeInTheDocument()
  expect(screen.getByText(new RegExp(about.version))).toBeInTheDocument()
})
`;
}

function generateRowTest(d) {
  return `import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ${d.entitySingularPascal}Row from '../components/${d.entitySingularPascal}Row'
import { formatVND } from '../utils/format'

const mockItem = {
  id: '99',
  name: 'Test Entity Name',
  ${d.textField}: '${d.textTestVal}',
  ${d.numField}: ${d.numTestVal},
  ${d.price1Field}: 1200000,
  ${d.price2Field}: 1500000,
  ${d.dateField}: '12/12/2026'
}

test('TODO-06: hiển thị modal xác nhận và gọi onDelete khi click confirm', () => {
  const deleteMock = jest.fn()
  render(
    <MemoryRouter>
      <table>
        <tbody>
          <${d.entitySingularPascal}Row
            ${d.entitySingular}={mockItem}
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
          <${d.entitySingularPascal}Row
            ${d.entitySingular}={mockItem}
            index={0}
            onDelete={jest.fn()}
            canManage={true}
          />
        </tbody>
      </table>
    </MemoryRouter>
  )
  expect(screen.getByText(/1\\.200\\.000|1,200,000/)).toBeInTheDocument()
})
`;
}

function generateDetailTest(d) {
  return `import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ${d.entitySingularPascal}Detail from '../pages/${d.entitySingularPascal}Detail'
import { ${d.entitySingularPascal}Context } from '../context/${d.entitySingularPascal}Context'
import * as api from '../api/${d.entitySingular}Api'

jest.mock('../api/${d.entitySingular}Api')

const mockItem = {
  id: '5',
  name: 'Detail Entity Name',
  ${d.textField}: '${d.textTestVal}',
  ${d.numField}: ${d.numTestVal},
  ${d.price1Field}: 2000000,
  ${d.price2Field}: 2500000,
  ${d.dateField}: '15/05/2026'
}

const mockCtx = {
  state: {
    loading: false,
    error: null,
    ${d.typePlural}: [{ id: '1', name: 'StandardType' }],
    ${d.entityPlural}: [mockItem]
  },
  dispatch: jest.fn()
}

test('TODO-05: hiển thị spinner khi loading và render card thông tin sau khi load xong', async () => {
  api.fetch${d.entitySingularPascal}ById.mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockItem), 50)))

  render(
    <MemoryRouter initialEntries={['/${d.entityPlural}/5']}>
      <${d.entitySingularPascal}Context.Provider value={mockCtx}>
        <Routes>
          <Route path="/${d.entityPlural}/:id" element={<${d.entitySingularPascal}Detail />} />
        </Routes>
      </${d.entitySingularPascal}Context.Provider>
    </MemoryRouter>
  )

  // Spinner should exist
  expect(screen.getByClassName ? screen.getByClassName('spinner-border') : document.querySelector('.spinner-border')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Detail Entity Name')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
})
`;
}

function generateManageTypesTest(d) {
  return `import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Manage${d.typePluralPascal} from '../pages/Manage${d.typePluralPascal}'
import { ${d.entitySingularPascal}Context } from '../context/${d.entitySingularPascal}Context'
import * as api from '../api/${d.entitySingular}Api'

jest.mock('../api/${d.entitySingular}Api')

const mockTypes = [
  { id: '1', name: 'Type A' },
  { id: '2', name: 'Type B' }
]

const mockCtx = {
  state: {
    loading: false,
    error: null,
    ${d.typePlural}: mockTypes,
    ${d.entityPlural}: []
  },
  dispatch: jest.fn()
}

test('TODO-10A: validate không add trùng lặp và add hợp lệ', async () => {
  render(
    <MemoryRouter>
      <${d.entitySingularPascal}Context.Provider value={mockCtx}>
        <Manage${d.typePluralPascal} />
      </${d.entitySingularPascal}Context.Provider>
    </MemoryRouter>
  )

  const input = screen.getByPlaceholderText(/e\\.g\\. Buffet/i)
  const addBtn = screen.getByRole('button', { name: /add/i })

  // Try duplicate
  fireEvent.change(input, { target: { value: 'Type A' } })
  fireEvent.click(addBtn)

  await waitFor(() => {
    expect(screen.getByRole('alert')).toHaveTextContent(/already exists/i)
  })
  expect(api.add${d.typeSingularPascal}).not.toHaveBeenCalled()
})

test('TODO-10B: check in-use trước khi xóa', async () => {
  api.fetch${d.entityPluralPascal}.mockResolvedValue([{ id: '10', name: 'Sub', ${d.typeIdField}: '1' }])

  render(
    <MemoryRouter>
      <${d.entitySingularPascal}Context.Provider value={mockCtx}>
        <Manage${d.typePluralPascal} />
      </${d.entitySingularPascal}Context.Provider>
    </MemoryRouter>
  )

  const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
  fireEvent.click(deleteButtons[0]) // First is Type A (id: 1), which is in use

  // Modal confirm open
  const confirmBtn = screen.getAllByRole('button', { name: /Delete/i }).pop()
  fireEvent.click(confirmBtn)

  await waitFor(() => {
    expect(screen.getByRole('alert')).toHaveTextContent(/currently in use/i)
  })
  expect(api.delete${d.typeSingularPascal}).not.toHaveBeenCalled()
})
`;
}

function generateTypeDetailTest(d) {
  return `import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ${d.typeSingularPascal}Detail from '../pages/${d.typeSingularPascal}Detail'
import * as api from '../api/${d.entitySingular}Api'

jest.mock('../api/${d.entitySingular}Api')

const mockTypes = [{ id: '1', name: 'Type ABC' }]
const mockItems = [{ id: '2', name: 'Item ABC', ${d.typeIdField}: '1', ${d.textField}: 'val', ${d.numField}: 10, ${d.price1Field}: 50000 }]

test('TODO-09: fetch song song bằng Promise.all và render', async () => {
  api.fetch${d.typePluralPascal}.mockResolvedValue(mockTypes)
  api.fetch${d.entityPluralPascal}.mockResolvedValue(mockItems)

  render(
    <MemoryRouter initialEntries={['/${d.typePlural}/1']}>
      <Routes>
        <Route path="/${d.typePlural}/:id" element={<${d.typeSingularPascal}Detail />} />
      </Routes>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByText('Type ABC')).toBeInTheDocument()
  })
  expect(screen.getByText('Item ABC')).toBeInTheDocument()
})
`;
}

function generateListTest(d) {
  return `import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ${d.entitySingularPascal}List from '../pages/${d.entitySingularPascal}List'
import { ${d.entitySingularPascal}Context } from '../context/${d.entitySingularPascal}Context'
import { AuthContext } from '../context/AuthContext'

const mockItems = [
  { id: '1', name: 'Alpha', ${d.textField}: 'x', ${d.numField}: 5, ${d.price1Field}: 100000 },
  { id: '2', name: 'Beta', ${d.textField}: 'y', ${d.numField}: 10, ${d.price1Field}: 50000 }
]

const mockCtx = {
  state: {
    loading: false,
    error: null,
    ${d.typePlural}: [],
    ${d.entityPlural}: mockItems
  },
  dispatch: jest.fn()
}

const renderList = (role) =>
  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user: { role, email: 'x@test.com' }, isAuthenticated: true }}>
        <${d.entitySingularPascal}Context.Provider value={mockCtx}>
          <${d.entitySingularPascal}List />
        </${d.entitySingularPascal}Context.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  )

test('TODO-01: hiển thị có điều kiện dựa trên role', () => {
  const { rerender } = renderList('User')
  expect(screen.queryByRole('button', { name: /add/i })).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()

  rerender(
    <MemoryRouter>
      <AuthContext.Provider value={{ user: { role: 'Admin' }, isAuthenticated: true }}>
        <${d.entitySingularPascal}Context.Provider value={mockCtx}>
          <${d.entitySingularPascal}List />
        </${d.entitySingularPascal}Context.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  )
  expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
})

test('TODO-03: sắp xếp theo giá và chữ cái', () => {
  renderList('Admin')
  const select = screen.getByLabelText(/sort by/i)
  
  // Sort price asc -> Beta (50000) then Alpha (100000)
  fireEvent.change(select, { target: { value: 'price-asc' } })
  const rows = screen.getAllByRole('row').slice(1) // skip header
  expect(rows[0]).toHaveTextContent('Beta')
})
`;
}

function generateAddTest(d) {
  return `import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Add${d.entitySingularPascal} from '../pages/Add${d.entitySingularPascal}'
import { ${d.entitySingularPascal}Context } from '../context/${d.entitySingularPascal}Context'
import * as api from '../api/${d.entitySingular}Api'

jest.mock('../api/${d.entitySingular}Api')

const mockCtx = {
  state: { loading: false, error: null, ${d.typePlural}: [], ${d.entityPlural}: [] },
  dispatch: jest.fn()
}

test('TODO-04: load dropdown options và post thành công', async () => {
  api.fetch${d.typePluralPascal}.mockResolvedValue([{ id: '1', name: 'Type A' }])
  api.add${d.entitySingularPascal}.mockResolvedValue({ id: '12', name: 'New Item' })

  render(
    <MemoryRouter>
      <${d.entitySingularPascal}Context.Provider value={mockCtx}>
        <Add${d.entitySingularPascal} />
      </${d.entitySingularPascal}Context.Provider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByRole('option', { name: 'Type A' })).toBeInTheDocument()
  })

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'New Item' } })
  fireEvent.change(screen.getByLabelText(new RegExp(mockCtx.state.loading ? 'Type' : '${d.typeSingularPascal}')), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText(new RegExp('${d.price1Label}')), { target: { value: '50000' } })
  
  fireEvent.click(screen.getByRole('button', { name: /add/i }))
  
  await waitFor(() => {
    expect(api.add${d.entitySingularPascal}).toHaveBeenCalled()
  })
})
`;
}

function generateAuthContextTest(d) {
  return `import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { ${d.entitySingularPascal}Provider } from '../context/${d.entitySingularPascal}Context'
import AppNavbar from '../components/AppNavbar'
import AppRoutes from '../routes/AppRoutes'
import * as entityApi from '../api/${d.entitySingular}Api'
import * as authApi from '../api/authApi'

jest.mock('../api/${d.entitySingular}Api')
jest.mock('../api/authApi')

const renderApp = (initialPath) =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AuthProvider>
        <${d.entitySingularPascal}Provider>
          <AppNavbar />
          <AppRoutes />
        </${d.entitySingularPascal}Provider>
      </AuthProvider>
    </MemoryRouter>
  )

describe('AuthContext — phiên đăng nhập phải được giữ lại khi reload / truy cập trực tiếp URL', () => {
  beforeEach(() => {
    entityApi.fetch${d.typePluralPascal}.mockResolvedValue([{ id: '1', name: 'Standard' }])
    entityApi.fetch${d.entityPluralPascal}.mockResolvedValue([])
  })

  test('chưa từng đăng nhập → truy cập /${d.typePlural}/999 lần đầu sẽ về trang Login (đúng, không phải bug)', async () => {
    renderApp('/${d.typePlural}/999')
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    })
  })

  test('BUG ĐÃ FIX: đăng nhập thành công, sau đó "reload" (remount) tại /${d.typePlural}/999 → vẫn còn phiên đăng nhập, KHÔNG bị đưa về Login', async () => {
    authApi.login.mockResolvedValue({
      id: '1', username: 'admin', role: 'Admin', email: 'admin@test.com', fullName: 'Rental Manager',
    })

    const { unmount } = renderApp('/login')
    fireEvent.change(screen.getByPlaceholderText(/Enter username/i), { target: { value: 'admin' } })
    fireEvent.change(screen.getByPlaceholderText(/Enter password/i), { target: { value: 'admin123' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'Login' })).not.toBeInTheDocument()
    })

    // Unmount toàn bộ app rồi render lại từ đầu tại URL khác — mô phỏng đúng
    // hành vi reload trang / dán URL /${d.typePlural}/999 vào thanh địa chỉ.
    unmount()
    renderApp('/${d.typePlural}/999')
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'Login' })).not.toBeInTheDocument()
    })
  })

  test('logout → xóa phiên đăng nhập → reload lại route bảo vệ sẽ về Login', async () => {
    authApi.login.mockResolvedValue({
      id: '1', username: 'admin', role: 'Admin', email: 'admin@test.com', fullName: 'Rental Manager',
    })
    const { unmount } = renderApp('/login')
    fireEvent.change(screen.getByPlaceholderText(/Enter username/i), { target: { value: 'admin' } })
    fireEvent.change(screen.getByPlaceholderText(/Enter password/i), { target: { value: 'admin123' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'Login' })).not.toBeInTheDocument()
    })
    fireEvent.click(screen.getByRole('button', { name: /logout/i }))
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    })

    unmount()
    renderApp('/${d.typePlural}/999')
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    })
  })
})
`;
}

module.exports = {
  generateLoginTest,
  generateNavbarTest,
  generateFooterTest,
  generateRowTest,
  generateDetailTest,
  generateManageTypesTest,
  generateTypeDetailTest,
  generateListTest,
  generateAddTest,
  generateAuthContextTest
};
