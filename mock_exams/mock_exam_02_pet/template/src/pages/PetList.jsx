import { useState } from 'react'
import { Container, Table, Button, Form, Pagination, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { usePet } from '../context/PetContext'
import { useAuth } from '../context/AuthContext'
import PetRow from '../components/PetRow'
import { deletePet } from '../api/petApi'

export default function PetList() {
  const { state, dispatch } = usePet()
  const { pets, breeds, loading } = state
  const navigate = useNavigate()

  // TODO-01: Lấy user từ AuthContext, kiểm tra role Admin
      const isAdmin = false
  
  // Sắp xếp
  // TODO-03: Khai báo state sortBy và viết logic sort
      // code state sortBy ở đây
  
  // Phân trang
  const [page, setPage] = useState(1)
  const itemsPerPage = 3

  const handleSortChange = (e) => {
    // TODO-03: Cập nhật sortBy và reset page về 1
            // code handleSortChange ở đây
      }

  const handleDelete = async (id) => {
    try {
      await deletePet(id)
      dispatch({ type: 'DELETE_ITEM', payload: id })
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="text-center mt-5">Loading...</div>

  // Logic Sắp xếp
      const sortedItems = pets
  
  // Phân trang sau khi sort
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage)
  const paginatedItems = sortedItems.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <Container className="mt-4">
      <Row className="mb-3 align-items-center">
        <Col>
          <h2>List of Pets</h2>
        </Col>
        <Col md={3}>
          {/* TODO-03: Dropdown Form.Select sắp xếp với aria-label="Sort by" */}
                              {/* Form.Select sắp xếp ở đây */}
                  </Col>
        <Col md="auto">
          {/* TODO-01: Chỉ hiện nút Add nếu là Admin */}
                              <Button onClick={() => navigate('/add')}>+ Add Pet</Button>
                  </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Owner Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item, idx) => (
            // TODO-01: Truyền canManage={isAdmin} xuống PetRow
                                    <PetRow
              key={item.id}
              pet={item}
              index={(page - 1) * itemsPerPage + idx}
              onDelete={handleDelete}
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
