const fs = require('fs');
const path = require('path');

function generateAppNavbarJs(d) {
  return `import { Navbar, Container, Nav, Badge, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import about from '../data/about'

export default function AppNavbar() {
  const { user, isAuthenticated, logoutUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    // === SOLUTION_START ===
    logoutUser()
    navigate('/login')
    // === SOLUTION_END ===
    // === TEMPLATE_START ===
    // TODO-03: Gọi logoutUser và navigate đến /login
    // === TEMPLATE_END ===
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* TODO-04: Brand click -> navigate về / bằng as={Link} to="/" */}
        // === SOLUTION_START ===
        <Navbar.Brand as={Link} to="/">
          <img
            src={about.logo}
            alt="logo"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          {about.appName}
        </Navbar.Brand>
        // === SOLUTION_END ===
        // === TEMPLATE_START ===
        <Navbar.Brand href="#">
          <img
            src="/logo.png"
            alt="logo"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          App Brand
        </Navbar.Brand>
        // === TEMPLATE_END ===

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/${d.typePlural}">Manage ${d.typePluralPascal}</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {/* TODO-02: Hiển thị user.${d.navbarStyle === 'N1' ? 'fullName' : d.navbarStyle === 'N2' ? 'email' : 'username'} (bold, white) + Badge role */}
            {isAuthenticated && user && (
              <div className="d-flex align-items-center gap-2">
                // === SOLUTION_START ===
                <span className="text-white fw-bold me-2">
                  {user.${d.navbarStyle === 'N1' ? 'fullName' : d.navbarStyle === 'N2' ? 'email' : 'username'}}
                </span>
                <Badge bg="info" className="me-2">{user.role}</Badge>
                // === SOLUTION_END ===
                // === TEMPLATE_START ===
                {/* code hiển thị thông tin user ở đây */}
                // === TEMPLATE_END ===
                
                {/* TODO-03: Nút Logout chỉ hiển thị khi đã đăng nhập */}
                // === SOLUTION_START ===
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
                // === SOLUTION_END ===
                // === TEMPLATE_START ===
                {/* code nút Logout ở đây */}
                // === TEMPLATE_END ===
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
`;
}

function generateAppFooterJs(d) {
  return `import about from '../data/about'

export default function AppFooter() {
  // TODO-08: Thẻ footer lấy động các thông tin từ about.js
  // === SOLUTION_START ===
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container d-flex align-items-center justify-content-center gap-3">
        <img src={about.logo} alt="logo" width="24" height="24" />
        <span>{about.copyright} | {about.course} | {about.version}</span>
      </div>
    </footer>
  )
  // === SOLUTION_END ===
  // === TEMPLATE_START ===
  return (
    <div className="bg-dark text-white text-center py-3 mt-auto">
      <span>Footer Info - Hardcoded</span>
    </div>
  )
  // === TEMPLATE_END ===
}
`;
}

function generateModalConfirmJs(d) {
  return `import { Modal, Button } from 'react-bootstrap'

export default function ModalConfirm({ show, title, message, onConfirm, onCancel, confirmText = 'Delete' }) {
  return (
    <Modal show={show} onHide={onCancel} role="dialog">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
`;
}

function generateEntityRowJs(d) {
  return `import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatVND, formatPriceRange, formatDateDisplay } from '../utils/format'
import ModalConfirm from './ModalConfirm'

export default function ${d.entitySingularPascal}Row({ ${d.entitySingular}, index, onDelete, canManage }) {
  // TODO-06: useState quản lý showModal
  // === SOLUTION_START ===
  const [showModal, setShowModal] = useState(false)
  // === SOLUTION_END ===
  // === TEMPLATE_START ===
  // code useState ở đây
  // === TEMPLATE_END ===

  const handleDeleteConfirm = () => {
    // === SOLUTION_START ===
    onDelete(${d.entitySingular}.id)
    setShowModal(false)
    // === SOLUTION_END ===
    // === TEMPLATE_START ===
    // TODO-06: Gọi onDelete với id và đóng modal
    // === TEMPLATE_END ===
  }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <Link to={\`/${d.entityPlural}/\${${d.entitySingular}.id}\`}>
          {${d.entitySingular}.name}
        </Link>
      </td>
      <td>{${d.entitySingular}.${d.textField}}</td>
      <td>
        {${d.priceStyle === 'min-max' 
          ? "formatPriceRange(" + d.entitySingular + "." + d.price1Field + ", " + d.entitySingular + "." + d.price2Field + ")"
          : "formatVND(" + d.entitySingular + "." + d.price1Field + ")"
        }}
        // === SOLUTION_END ===

        // === TEMPLATE_START ===
        —
        // === TEMPLATE_END ===
      </td>
      <td>
        <div className="d-flex gap-2">
          <Link to={\`/${d.entityPlural}/\${${d.entitySingular}.id}\`} className="btn btn-sm btn-info text-white">
            View
          </Link>
          {/* TODO-01, TODO-06: Ẩn hiện nút Delete dựa trên canManage */}
          // === SOLUTION_START ===
          {canManage && (
            <Button variant="danger" size="sm" onClick={() => setShowModal(true)}>
              Delete
            </Button>
          )}
          // === SOLUTION_END ===
          // === TEMPLATE_START ===
          <Button variant="danger" size="sm">
            Delete
          </Button>
          // === TEMPLATE_END ===
        </div>

        {/* TODO-06: ModalConfirm xác nhận xóa */}
        // === SOLUTION_START ===
        <ModalConfirm
          show={showModal}
          title="Confirm Delete"
          message={
            <span>
              Are you sure you want to delete <strong>{${d.entitySingular}.name}</strong>?
            </span>
          }
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowModal(false)}
        />
        // === SOLUTION_END ===
      </td>
    </tr>
  )
}
`;
}

function generateLoginJs(d) {
  return `import { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap'
import { login } from '../api/authApi'
import { useAuth } from '../context/AuthContext'
import { validateUsername, validatePassword } from '../utils/validate'
import { loginReducer, loginInitialState } from '../reducer/authReducer'

export default function Login() {
  const navigate = useNavigate()
  const { loginUser } = useAuth()
  const [state, dispatch] = useReducer(loginReducer, loginInitialState)
  const { username, password, serverError, validated } = state

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'SET_VALIDATED', payload: true })

    if (!e.currentTarget.checkValidity()) {
      e.stopPropagation()
      return
    }

    const uError = validateUsername(username)
    const pError = validatePassword(password)
    if (uError || pError) return

    try {
      const user = await login(username, password)
      loginUser(user)
      navigate('/')
    } catch (err) {
      // TODO-01: Bắt lỗi đăng nhập và hiển thị Alert
      // === SOLUTION_START ===
      dispatch({ type: 'SET_ERROR', payload: err.message })
      // === SOLUTION_END ===
      // === TEMPLATE_START ===
      // code dispatch lỗi ở đây
      // === TEMPLATE_END ===
    }
  }

  const handleCancel = () => {
    dispatch({ type: 'CANCEL' })
    navigate('/')
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={5}>
          <Card>
            <Card.Header as="h5" className="text-center">
              Login
            </Card.Header>
            <Card.Body>
              {serverError && (
                <Alert
                  variant="danger"
                  role="alert"
                  dismissible
                  onClose={() => dispatch({ type: 'SET_ERROR', payload: '' })}
                >
                  {serverError}
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="loginUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) =>
                      dispatch({ type: 'SET_USERNAME', payload: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {validateUsername(username) ?? 'Username is required.'}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                      dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {validatePassword(password) ?? 'Password is required.'}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button type="submit" variant="primary" className="flex-grow-1">
                    Login
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    className="flex-grow-1"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
`;
}
function generateEntityListJs(d) {
  return `import { useState } from 'react'
import { Container, Table, Button, Form, Pagination, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { use${d.entitySingularPascal} } from '../context/${d.entitySingularPascal}Context'
import { useAuth } from '../context/AuthContext'
import ${d.entitySingularPascal}Row from '../components/${d.entitySingularPascal}Row'
import { delete${d.entitySingularPascal} } from '../api/${d.entitySingular}Api'

export default function ${d.entitySingularPascal}List() {
  const { state, dispatch } = use${d.entitySingularPascal}()
  const { ${d.entityPlural}, ${d.typePlural}, loading } = state
  const navigate = useNavigate()

  // TODO-01: Lấy user từ AuthContext, kiểm tra role Admin
  // === SOLUTION_START ===
  const { user } = useAuth()
  const isAdmin = user?.role === 'Admin'
  // === SOLUTION_END ===
  // === TEMPLATE_START ===
  const isAdmin = false
  // === TEMPLATE_END ===

  // Sắp xếp
  // TODO-03: Khai báo state sortBy và viết logic sort
  // === SOLUTION_START ===
  const [sortBy, setSortBy] = useState('')
  // === SOLUTION_END ===
  // === TEMPLATE_START ===
  // code state sortBy ở đây
  // === TEMPLATE_END ===

  // Phân trang
  const [page, setPage] = useState(1)
  const itemsPerPage = 3

  const handleSortChange = (e) => {
    // TODO-03: Cập nhật sortBy và reset page về 1
    // === SOLUTION_START ===
    setSortBy(e.target.value)
    setPage(1)
    // === SOLUTION_END ===
    // === TEMPLATE_START ===
    // code handleSortChange ở đây
    // === TEMPLATE_END ===
  }

  const handleDelete = async (id) => {
    try {
      await delete${d.entitySingularPascal}(id)
      dispatch({ type: 'DELETE_ITEM', payload: id })
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="text-center mt-5">Loading...</div>

  // Logic Sắp xếp
  // === SOLUTION_START ===
  const sortedItems = [...${d.entityPlural}].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      case 'num-asc':
        return Number(a.${d.numField}) - Number(b.${d.numField})
      case 'num-desc':
        return Number(b.${d.numField}) - Number(a.${d.numField})
      case 'price-asc':
        return Number(a.${d.price1Field}) - Number(b.${d.price1Field})
      case 'price-desc':
        return Number(b.${d.price1Field}) - Number(a.${d.price1Field})
      default:
        return 0
    }
  })
  // === SOLUTION_END ===
  // === TEMPLATE_START ===
  const sortedItems = ${d.entityPlural}
  // === TEMPLATE_END ===

  // Phân trang sau khi sort
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage)
  const paginatedItems = sortedItems.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <Container className="mt-4">
      <Row className="mb-3 align-items-center">
        <Col>
          <h2>List of ${d.entityPluralPascal}</h2>
        </Col>
        <Col md={3}>
          {/* TODO-03: Dropdown Form.Select sắp xếp với aria-label="Sort by" */}
          // === SOLUTION_START ===
          <Form.Select aria-label="Sort by" value={sortBy} onChange={handleSortChange}>
            <option value="">-- Sort by --</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="num-asc">${d.numLabel} (Low-High)</option>
            <option value="num-desc">${d.numLabel} (High-Low)</option>
            <option value="price-asc">Price (Low-High)</option>
            <option value="price-desc">Price (High-Low)</option>
          </Form.Select>
          // === SOLUTION_END ===
          // === TEMPLATE_START ===
          {/* Form.Select sắp xếp ở đây */}
          // === TEMPLATE_END ===
        </Col>
        <Col md="auto">
          {/* TODO-01: Chỉ hiện nút Add nếu là Admin */}
          // === SOLUTION_START ===
          {isAdmin && (
            <Button onClick={() => navigate('/add')}>+ Add ${d.entitySingularPascal}</Button>
          )}
          // === SOLUTION_END ===
          // === TEMPLATE_START ===
          <Button onClick={() => navigate('/add')}>+ Add ${d.entitySingularPascal}</Button>
          // === TEMPLATE_END ===
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>${d.textFieldLabel || d.textLabel}</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item, idx) => (
            // TODO-01: Truyền canManage={isAdmin} xuống ${d.entitySingularPascal}Row
            // === SOLUTION_START ===
            <${d.entitySingularPascal}Row
              key={item.id}
              ${d.entitySingular}={item}
              index={(page - 1) * itemsPerPage + idx}
              onDelete={handleDelete}
              canManage={isAdmin}
            />
            // === SOLUTION_END ===
            // === TEMPLATE_START ===
            <${d.entitySingularPascal}Row
              key={item.id}
              ${d.entitySingular}={item}
              index={(page - 1) * itemsPerPage + idx}
              onDelete={handleDelete}
            />
            // === TEMPLATE_END ===
          ))}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === page}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </Container>
  )
}
`;
}

function generateEntityDetailJs(d) {
  return `import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetch${d.entitySingularPascal}ById } from '../api/${d.entitySingular}Api'
import { use${d.entitySingularPascal} } from '../context/${d.entitySingularPascal}Context'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function ${d.entitySingularPascal}Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = use${d.entitySingularPascal}()
  const [${d.entitySingular}, set${d.entitySingularPascal}] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
  // === SOLUTION_START ===
  useEffect(() => {
    fetch${d.entitySingularPascal}ById(id)
      .then((data) => {
        set${d.entitySingularPascal}(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load details.')
        setLoading(false)
      })
  }, [id])
  // === SOLUTION_END ===
  // === TEMPLATE_START ===
  // code useEffect ở đây
  // === TEMPLATE_END ===

  // TODO-05: Hiển thị Spinner khi loading
  // === SOLUTION_START ===
  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />
  }
  // === SOLUTION_END ===
  // === TEMPLATE_START ===
  // code Spinner ở đây
  // === TEMPLATE_END ===

  // TODO-05: Hiển thị Alert khi lỗi
  // === SOLUTION_START ===
  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger" role="alert">{error}</Alert>
      </Container>
    )
  }
  // === SOLUTION_END ===

  if (!${d.entitySingular}) return null

  const typeName = state.${d.typePlural}.find(t => String(t.id) === String(${d.entitySingular}.${d.typeIdField}))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {${d.entitySingular}.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>${d.textLabel}:</strong> {${d.entitySingular}.${d.textField}}
          </Card.Text>
          <Card.Text>
            <strong>${d.numLabel}:</strong> {${d.entitySingular}.${d.numField}}
          </Card.Text>
          <Card.Text>
            <strong>${d.price1Label}:</strong> {formatVND(${d.entitySingular}.${d.price1Field})}
          </Card.Text>
          {${d.entitySingular}.${d.price2Field} !== undefined && (
            <Card.Text>
              <strong>${d.price2Label}:</strong> {formatVND(${d.entitySingular}.${d.price2Field})}
            </Card.Text>
          )}
          <Card.Text>
            <strong>${d.dateLabel}:</strong> {formatDateDisplay(${d.entitySingular}.${d.dateField})}
          </Card.Text>
          
          {/* TODO-05: Nút Back điều hướng về trang trước bằng navigate(-1) */}
          // === SOLUTION_START ===
          <Button variant="secondary" onClick={() => navigate(-1)}>
            ← Back
          </Button>
          // === SOLUTION_END ===
          // === TEMPLATE_START ===
          <Button variant="secondary">Back</Button>
          // === TEMPLATE_END ===
        </Card.Body>
      </Card>
    </Container>
  )
}
`;
}

function generateAddEntityJs(d) {
  return `import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Card } from 'react-bootstrap'
import { fetch${d.typePluralPascal}, add${d.entitySingularPascal} } from '../api/${d.entitySingular}Api'
import { use${d.entitySingularPascal} } from '../context/${d.entitySingularPascal}Context'

export default function Add${d.entitySingularPascal}() {
  const navigate = useNavigate()
  const { dispatch } = use${d.entitySingularPascal}()
  
  // TODO-04: Khai báo state carTypes/roomTypes...
  // === SOLUTION_START ===
  const [types, setTypes] = useState([])
  // === SOLUTION_END ===
  // === TEMPLATE_START ===
  const [types, setTypes] = useState([])
  // === TEMPLATE_END ===

  const [name, setName] = useState('')
  const [typeId, setTypeId] = useState('')
  const [numFieldVal, setNumFieldVal] = useState('')
  const [textFieldVal, setTextFieldVal] = useState('')
  const [price1, setPrice1] = useState('')
  const [price2, setPrice2] = useState('')
  const [dateFieldVal, setDateFieldVal] = useState('')

  // TODO-04: fetch danh sách loại thực thể từ API trong useEffect
  // === SOLUTION_START ===
  useEffect(() => {
    fetch${d.typePluralPascal}().then(setTypes).catch(console.error)
  }, [])
  // === SOLUTION_END ===
  // === TEMPLATE_START ===
  // code useEffect ở đây
  // === TEMPLATE_END ===

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !typeId || !price1) return

    const newItem = {
      name,
      ${d.typeIdField}: typeId,
      ${d.numField}: Number(numFieldVal),
      ${d.textField}: textFieldVal,
      ${d.price1Field}: Number(price1),
      ${d.price2Field}: Number(price2),
      ${d.dateField}: dateFieldVal
    }

    try {
      const created = await add${d.entitySingularPascal}(newItem)
      dispatch({ type: 'ADD_ITEM', payload: created })
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <Card>
        <Card.Header as="h5">Add New ${d.entitySingularPascal}</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control required value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>${d.typeSingularPascal}</Form.Label>
              {/* TODO-04: render dropdown với option đầu tiên là -- Select -- */}
              // === SOLUTION_START ===
              <Form.Select required value={typeId} onChange={e => setTypeId(e.target.value)}>
                <option value="">-- Select ${d.typeSingular} type --</option>
                {types.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </Form.Select>
              // === SOLUTION_END ===
              // === TEMPLATE_START ===
              <Form.Select required value={typeId} onChange={e => setTypeId(e.target.value)}>
                <option value="">-- Select --</option>
              </Form.Select>
              // === TEMPLATE_END ===
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNum">
              <Form.Label>${d.numLabel}</Form.Label>
              <Form.Control type="number" value={numFieldVal} onChange={e => setNumFieldVal(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formText">
              <Form.Label>${d.textLabel}</Form.Label>
              <Form.Control value={textFieldVal} onChange={e => setTextFieldVal(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice1">
              <Form.Label>${d.price1Label}</Form.Label>
              <Form.Control type="number" required value={price1} onChange={e => setPrice1(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice2">
              <Form.Label>${d.price2Label}</Form.Label>
              <Form.Control type="number" value={price2} onChange={e => setPrice2(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>${d.dateLabel}</Form.Label>
              <Form.Control value={dateFieldVal} onChange={e => setDateFieldVal(e.target.value)} />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary">Add</Button>
              <Button variant="outline-secondary" onClick={() => navigate('/')}>Cancel</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}
`;
}

function generateManageTypesJs(d) {
  return `import { useState } from 'react'
import { Container, Table, Button, Form, Alert, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { use${d.entitySingularPascal} } from '../context/${d.entitySingularPascal}Context'
import { add${d.typeSingularPascal}, delete${d.typeSingularPascal}, fetch${d.entityPluralPascal} } from '../api/${d.entitySingular}Api'
import ModalConfirm from '../components/ModalConfirm'

export default function Manage${d.typePluralPascal}() {
  const { state, dispatch } = use${d.entitySingularPascal}()
  const { ${d.typePlural}, loading } = state
  const [typeName, setTypeName] = useState('')
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [targetType, setTargetType] = useState(null)

  const handleAdd = async (e) => {
    e.preventDefault()
    setError('')
    // TODO-10A: Validation tên danh mục dài >= 3 và không được trùng (case-insensitive)
    // === SOLUTION_START ===
    if (typeName.trim().length < 3) return
    
    const exists = ${d.typePlural}.some(t => t.name.toLowerCase() === typeName.trim().toLowerCase())
    if (exists) {
      setError(\`\${typeName} already exists.\`)
      return
    }

    try {
      const created = await add${d.typeSingularPascal}({ name: typeName.trim() })
      dispatch({ type: 'ADD_TYPE', payload: created })
      setTypeName('')
    } catch (err) {
      setError(err.message)
    }
    // === SOLUTION_END ===
    // === TEMPLATE_START ===
    // code xử lý thêm mới ở đây
    // === TEMPLATE_END ===
  }

  const handleDeleteClick = (type) => {
    setTargetType(type)
    setShowModal(true)
  }

  const handleDeleteConfirm = async () => {
    setError('')
    // TODO-10B: Kiểm tra xem loại danh mục này có đang chứa thực thể con nào không trước khi xóa
    // === SOLUTION_START ===
    try {
      const allItems = await fetch${d.entityPluralPascal}()
      const inUse = allItems.some(item => String(item.${d.typeIdField}) === String(targetType.id))
      
      if (inUse) {
        setError(\`Cannot delete. Category \${targetType.name} is currently in use.\`)
        setShowModal(false)
        return
      }

      await delete${d.typeSingularPascal}(targetType.id)
      dispatch({ type: 'DELETE_TYPE', payload: targetType.id })
      setShowModal(false)
    } catch (err) {
      setError(err.message)
      setShowModal(false)
    }
    // === SOLUTION_END ===
    // === TEMPLATE_START ===
    // code xác nhận xóa ở đây
    // === TEMPLATE_END ===
  }

  if (loading) return <div className="text-center mt-5">Loading...</div>

  return (
    <Container className="mt-4">
      <h2>Manage ${d.typePluralPascal}</h2>
      
      {error && <Alert variant="danger" role="alert">{error}</Alert>}

      <Form onSubmit={handleAdd} className="row g-3 mb-4">
        <Col md={6}>
          <Form.Control
            required
            placeholder="placeholder-placeholder"
            placeholder="e.g. Buffet"
            value={typeName}
            onChange={e => setTypeName(e.target.value)}
          />
        </Col>
        <Col md={auto => 'auto'}>
          <Button type="submit" variant="primary">Add</Button>
        </Col>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {${d.typePlural}.map((t, idx) => (
            <tr key={t.id}>
              <td>{idx + 1}</td>
              <td>
                <Link to={\`/${d.typePlural}/\${t.id}\`}>{t.name}</Link>
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDeleteClick(t)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {targetType && (
        <ModalConfirm
          show={showModal}
          title="Confirm Delete Type"
          message={
            <span>
              Are you sure you want to delete category <strong>{targetType.name}</strong>?
            </span>
          }
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </Container>
  )
}
`;
}

function generateTypeDetailJs(d) {
  return `import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Table, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetch${d.typePluralPascal}, fetch${d.entityPluralPascal} } from '../api/${d.entitySingular}Api'
import { formatVND } from '../utils/format'

export default function ${d.typeSingularPascal}Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [type, setType] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-09 hoặc TODO-10A: fetch song song hai bảng bằng Promise.all
  // === SOLUTION_START ===
  useEffect(() => {
    Promise.all([fetch${d.typePluralPascal}(), fetch${d.entityPluralPascal}()])
      .then(([typesData, itemsData]) => {
        const found = typesData.find(t => String(t.id) === String(id))
        if (!found) {
          setError('Category not found.')
          setLoading(false)
          // Đề mẫu 2: Redirect sang 404
          if ('${d.categoryStyle}' === 'C2' || '${d.categoryStyle}' === 'C1') {
             navigate('/not-found', { replace: true })
          }
          return
        }
        setType(found)
        setItems(itemsData.filter(item => String(item.${d.typeIdField}) === String(id)))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message || 'Error loading details.')
        setLoading(false)
      })
  }, [id])
  // === SOLUTION_END ===
  // === TEMPLATE_START ===
  // code useEffect ở đây
  // === TEMPLATE_END ===

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger" role="alert">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>
          Category: <Badge bg="primary">{type?.name}</Badge>
        </h2>
        {/* TODO-09 hoặc TODO-10A: nút Back to Categories */}
        // === SOLUTION_START ===
        <Button variant="secondary" onClick={() => navigate('/${d.typePlural}')}>
          ← Back to ${d.typePluralPascal}
        </Button>
        // === SOLUTION_END ===
        // === TEMPLATE_START ===
        <Button variant="secondary">Back to Categories</Button>
        // === TEMPLATE_END ===
      </div>

      <h5>Total items in this category: {items.length}</h5>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>${d.textLabel}</th>
            <th>${d.numLabel}</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>{item.${d.textField}}</td>
              <td>{item.${d.numField}}</td>
              <td>{formatVND(item.${d.price1Field})}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
`;
}

function generateNotFoundJs(d) {
  return `import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Container className="text-center mt-5 py-5">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="lead text-muted mb-4">
        The page you are looking for does not exist or has been moved.
      </p>
      {/* TODO-09: Nút Back to Home */}
      // === SOLUTION_START ===
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
      // === SOLUTION_END ===
      // === TEMPLATE_START ===
      <Button variant="primary">Home</Button>
      // === TEMPLATE_END ===
    </Container>
  )
}
`;
}

// Generate markdown file DeThi.md
function generateDeThiMarkdown(d) {
  return `# BÀI THI TEST PRACTICE — FER202
## ${d.title}

> **Thời gian:** 90 phút  
> **Tổng điểm:** 10 điểm  
> **Công cụ:** VS Code, trình duyệt, tài liệu được phép mở trên máy 

---

## Giới thiệu bài thi 

Bạn nhận được một project **${d.appName}** đã được dựng sẵn cấu trúc. Project sử dụng:
- React 18 + Vite
- React-Bootstrap 2.x
- axios + json-server (port 3001)
- React Router v6
- Context API + useReducer

**Khởi động project:**
\`\`\`bash
npm install
npm start        # chạy đồng thời json-server + Vite dev server
\`\`\`

Tài khoản test: \`admin / admin123\` (role: Admin) và \`user1 / user123\` (role: User)

---

## Bảng điểm tổng quan

| TODO | Chức năng | File | Điểm |
|------|-----------|------|------|
| TODO-01 | Alert khi đăng nhập sai / Phân quyền giao diện theo role | \`Login.jsx\` + \`${d.entitySingularPascal}List.jsx\` | 1,0 |
| TODO-02 | Hiển thị thông tin người dùng trên Navbar | \`AppNavbar.jsx\` | 1,0 |
| TODO-03 | Nút Logout hoặc Dropdown sắp xếp | \`AppNavbar.jsx\` + \`${d.entitySingularPascal}List.jsx\` | 1,0 |
| TODO-04 | Dropdown Form thêm mới | \`Add${d.entitySingularPascal}.jsx\` | 1,0 |
| TODO-05 | Trang chi tiết thực thể (Detail Page) | \`${d.entitySingularPascal}Detail.jsx\` | 1,0 |
| TODO-06 | Xóa thực thể kèm ModalConfirm | \`${d.entitySingularPascal}Row.jsx\` | 1,0 |
| TODO-07 | Định dạng cột dữ liệu trên dòng | \`${d.entitySingularPascal}Row.jsx\` | 0,5 |
| TODO-08 | Footer hiển thị động | \`AppFooter.jsx\` | 0,5 |
| TODO-09 | Trang 404 hoặc Fetch song song | \`NotFound.jsx\` hoặc \`${d.typeSingularPascal}Detail.jsx\` | 1,0 |
| TODO-10A | Thêm danh mục | \`Manage${d.typePluralPascal}.jsx\` | 1,0 |
| TODO-10B | Chặn xóa danh mục đang sử dụng | \`Manage${d.typePluralPascal}.jsx\` | 1,0 |
| **Tổng** | | | **10,0** |

---

## Chi tiết từng TODO

### TODO-01 — Đăng nhập & Phân quyền
- **Login.jsx**: Trong khối catch, dispatch lỗi để hiện Alert.
- **${d.entitySingularPascal}List.jsx**: Lấy user từ AuthContext. Nếu role != 'Admin' thì ẩn nút "+ Add" và truyền canManage={false} xuống Row để ẩn nút Delete.

### TODO-02 — Navbar hiển thị thông tin
- Hiển thị email hoặc fullName (bold, white) kèm Badge hiển thị role của user khi đã đăng nhập.

### TODO-03 — Dropdown sắp xếp
- Thêm dropdown sắp xếp (Sort by) Name / ${d.numLabel} / Price (tăng/giảm). Cập nhật phân trang và set page = 1.

### TODO-04 — Dropdown động Form thêm mới
- Gọi fetch${d.typePluralPascal}() trong useEffect để đổ dữ liệu vào Dropdown chọn loại. Option đầu tiên là placeholder có value="".

### TODO-05 — Chi tiết thực thể
- Gọi API fetch${d.entitySingularPascal}ById, hiển thị Spinner khi loading, hiển thị Alert khi lỗi, hiển thị chi tiết thực thể và có nút Back.

### TODO-06 — Xóa thực thể với ModalConfirm
- Nhấn Delete mở ModalConfirm xác nhận, xác nhận thì gọi DELETE API và đóng modal.

### TODO-07 — Định dạng cột Row
- Hiển thị tiền tệ VND đúng định dạng ở cột Price.

### TODO-08 — Footer hiển thị động
- Thẻ footer lấy động các thông tin logo, copyright, version, course từ about.js.

### TODO-09 — Trang 404 hoặc Fetch song song
- Tùy biến trang NotFound hiển thị "404", "Page Not Found", nút Back to Home; hoặc trang chi tiết danh mục fetch song song bằng Promise.all.

### TODO-10A & 10B — Quản lý danh mục
- Thêm mới danh mục có validation length >= 3 và uniqueness.
- Xóa danh mục phải gọi API kiểm tra xem có thực thể con nào đang liên kết không, nếu có thì báo lỗi chặn xóa.
`;
}

module.exports = {
  generateAppNavbarJs,
  generateAppFooterJs,
  generateModalConfirmJs,
  generateEntityRowJs,
  generateLoginJs,
  generateEntityListJs,
  generateEntityDetailJs,
  generateAddEntityJs,
  generateManageTypesJs,
  generateTypeDetailJs,
  generateNotFoundJs,
  generateDeThiMarkdown
};


