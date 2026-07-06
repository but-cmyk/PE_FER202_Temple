import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchProductById } from '../api/productApi'
import { useProduct } from '../context/ProductContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useProduct()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
      // code useEffect ở đây
  
  // TODO-05: Hiển thị Spinner khi loading
      // code Spinner ở đây
  
  // TODO-05: Hiển thị Alert khi lỗi
  
  if (!product) return null

  const typeName = state.brands.find(t => String(t.id) === String(product.brandId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {product.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Model Number:</strong> {product.model}
          </Card.Text>
          <Card.Text>
            <strong>Warranty (months):</strong> {product.warranty}
          </Card.Text>
          <Card.Text>
            <strong>Price Normal:</strong> {formatVND(product.priceWeekday)}
          </Card.Text>
          {product.priceWeekend !== undefined && (
            <Card.Text>
              <strong>Price Promo:</strong> {formatVND(product.priceWeekend)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Release Date:</strong> {formatDateDisplay(product.releaseDate)}
          </Card.Text>
          
          {/* TODO-05: Nút Back điều hướng về trang trước bằng navigate(-1) */}
                              <Button variant="secondary">Back</Button>
                  </Card.Body>
      </Card>
    </Container>
  )
}
