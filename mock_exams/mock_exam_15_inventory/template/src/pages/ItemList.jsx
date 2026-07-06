import { useState } from 'react'
import { Container, Table, Button, Form, Pagination, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useItem } from '../context/ItemContext'
import { useAuth } from '../context/AuthContext'
import ItemRow from '../components/ItemRow'
import { deleteItem } from '../api/itemApi'

export default function ItemList() {
  const { state, dispatch } = useItem()
  const { items, suppliers, loading } = state
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
      await deleteItem(id)
      dispatch({ type: 'DELETE_ITEM', payload: id })
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="text-center mt-5">Loading...</div>

  // Logic Sắp xếp
      const sortedItems = items
  
  // Phân trang sau khi sort
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage)
  const paginatedItems = sortedItems.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <Container className="mt-4">
      <Row className="mb-3 align-items-center">
        <Col>
          <h2>List of Items</h2>
        </Col>
        <Col md={3}>
          {/* TODO-03: Dropdown Form.Select sắp xếp với aria-label="Sort by" */}
                              {/* Form.Select sắp xếp ở đây */}
                  </Col>
        <Col md="auto">
          {/* TODO-01: Chỉ hiện nút Add nếu là Admin */}
                              <Button onClick={() => navigate('/add')}>+ Add Item</Button>
                  </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Unit</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item, idx) => (
            // TODO-01: Truyền canManage={isAdmin} xuống ItemRow
                                    <ItemRow
              key={item.id}
              item={item}
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
