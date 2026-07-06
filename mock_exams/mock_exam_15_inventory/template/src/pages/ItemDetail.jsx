import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchItemById } from '../api/itemApi'
import { useItem } from '../context/ItemContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function ItemDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useItem()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
      // code useEffect ở đây
  
  // TODO-05: Hiển thị Spinner khi loading
      // code Spinner ở đây
  
  // TODO-05: Hiển thị Alert khi lỗi
  
  if (!item) return null

  const typeName = state.suppliers.find(t => String(t.id) === String(item.supplierId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {item.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Unit:</strong> {item.unit}
          </Card.Text>
          <Card.Text>
            <strong>Stock Quantity:</strong> {item.stock}
          </Card.Text>
          <Card.Text>
            <strong>Cost Price:</strong> {formatVND(item.priceWeekday)}
          </Card.Text>
          {item.priceWeekend !== undefined && (
            <Card.Text>
              <strong>Selling Price:</strong> {formatVND(item.priceWeekend)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Expiry Date:</strong> {formatDateDisplay(item.expiryDate)}
          </Card.Text>
          
          {/* TODO-05: Nút Back điều hướng về trang trước bằng navigate(-1) */}
                              <Button variant="secondary">Back</Button>
                  </Card.Body>
      </Card>
    </Container>
  )
}
