import { useState } from 'react'
import { Container, Table, Button, Form, Pagination, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useGymClass } from '../context/GymClassContext'
import { useAuth } from '../context/AuthContext'
import GymClassRow from '../components/GymClassRow'
import { deleteGymClass } from '../api/gymClassApi'

export default function GymClassList() {
  const { state, dispatch } = useGymClass()
  const { gymClasses, trainers, loading } = state
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
      await deleteGymClass(id)
      dispatch({ type: 'DELETE_ITEM', payload: id })
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="text-center mt-5">Loading...</div>

  // Logic Sắp xếp
    const sortedItems = [...gymClasses].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      case 'num-asc':
        return Number(a.capacity) - Number(b.capacity)
      case 'num-desc':
        return Number(b.capacity) - Number(a.capacity)
      case 'price-asc':
        return Number(a.priceWeekday) - Number(b.priceWeekday)
      case 'price-desc':
        return Number(b.priceWeekday) - Number(a.priceWeekday)
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
          <h2>List of GymClasses</h2>
        </Col>
        <Col md={3}>
          {/* TODO-03: Dropdown Form.Select sắp xếp với aria-label="Sort by" */}
                    <Form.Select aria-label="Sort by" value={sortBy} onChange={handleSortChange}>
            <option value="">-- Sort by --</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="num-asc">Max Capacity (Low-High)</option>
            <option value="num-desc">Max Capacity (High-Low)</option>
            <option value="price-asc">Price (Low-High)</option>
            <option value="price-desc">Price (High-Low)</option>
          </Form.Select>
                            </Col>
        <Col md="auto">
          {/* TODO-01: Chỉ hiện nút Add nếu là Admin */}
                    {isAdmin && (
            <Button onClick={() => navigate('/add')}>+ Add GymClass</Button>
          )}
                            </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Level</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item, idx) => (
            // TODO-01: Truyền canManage={isAdmin} xuống GymClassRow
                        <GymClassRow
              key={item.id}
              gymClass={item}
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
