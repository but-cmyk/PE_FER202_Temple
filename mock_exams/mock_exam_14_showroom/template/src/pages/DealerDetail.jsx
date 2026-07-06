import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Table, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchDealers, fetchCars } from '../api/carApi'
import { formatVND } from '../utils/format'

export default function DealerDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [type, setType] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-09 hoặc TODO-10A: fetch song song hai bảng bằng Promise.all
      // code useEffect ở đây
  
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
                        <Button variant="secondary">Back to Categories</Button>
              </div>

      <h5>Total items in this category: {items.length}</h5>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Engine Type</th>
            <th>Model Year</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>{item.engine}</td>
              <td>{item.year}</td>
              <td>{formatVND(item.priceWeekday)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
