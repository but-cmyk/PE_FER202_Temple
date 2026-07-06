import { useState } from 'react'
import { Container, Table, Button, Form, Pagination, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useProperty } from '../context/PropertyContext'
import { useAuth } from '../context/AuthContext'
import PropertyRow from '../components/PropertyRow'
import { deleteProperty } from '../api/propertyApi'

export default function PropertyList() {
  const { state, dispatch } = useProperty()
  const { properties, agents, loading } = state
  const navigate = useNavigate()

  // TODO-01: Lấy user từ AuthContext, kiểm tra role Admin
    const { user } = useAuth()
  const isAdmin = user?.role === 'Admin'
    
  // Sắp xếp
  // TODO-03: Khai báo state sortBy và viết logic sort
    const [sortBy, setSortBy] = useState('')
    
  // Phân trang
  const [page, setPage] = useState(1)
  const itemsPerPage = 3

  const handleSortChange = (e) => {
    // TODO-03: Cập nhật sortBy và reset page về 1
        setSortBy(e.target.value)
    setPage(1)
          }

  const handleDelete = async (id) => {
    try {
      await deleteProperty(id)
      dispatch({ type: 'DELETE_ITEM', payload: id })
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="text-center mt-5">Loading...</div>

  // Logic Sắp xếp
    const sortedItems = [...properties].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      case 'num-asc':
        return Number(a.area) - Number(b.area)
      case 'num-desc':
        return Number(b.area) - Number(a.area)
      case 'price-asc':
        return Number(a.priceMin) - Number(b.priceMin)
      case 'price-desc':
        return Number(b.priceMin) - Number(a.priceMin)
      default:
        return 0
    }
  })
    
  // Phân trang sau khi sort
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage)
  const paginatedItems = sortedItems.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <Container className="mt-4">
      <Row className="mb-3 align-items-center">
        <Col>
          <h2>List of Properties</h2>
        </Col>
        <Col md={3}>
          {/* TODO-03: Dropdown Form.Select sắp xếp với aria-label="Sort by" */}
                    <Form.Select aria-label="Sort by" value={sortBy} onChange={handleSortChange}>
            <option value="">-- Sort by --</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="num-asc">Area (sqm) (Low-High)</option>
            <option value="num-desc">Area (sqm) (High-Low)</option>
            <option value="price-asc">Price (Low-High)</option>
            <option value="price-desc">Price (High-Low)</option>
          </Form.Select>
                            </Col>
        <Col md="auto">
          {/* TODO-01: Chỉ hiện nút Add nếu là Admin */}
                    {isAdmin && (
            <Button onClick={() => navigate('/add')}>+ Add Property</Button>
          )}
                            </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item, idx) => (
            // TODO-01: Truyền canManage={isAdmin} xuống PropertyRow
                        <PropertyRow
              key={item.id}
              property={item}
              index={(page - 1) * itemsPerPage + idx}
              onDelete={handleDelete}
              canManage={isAdmin}
            />
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
