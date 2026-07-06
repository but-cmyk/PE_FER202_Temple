import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchGigById } from '../api/gigApi'
import { useGig } from '../context/GigContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function GigDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useGig()
  const [gig, setGig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
      // code useEffect ở đây
  
  // TODO-05: Hiển thị Spinner khi loading
      // code Spinner ở đây
  
  // TODO-05: Hiển thị Alert khi lỗi
  
  if (!gig) return null

  const typeName = state.categories.find(t => String(t.id) === String(gig.categoryId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {gig.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Seller Level:</strong> {gig.level}
          </Card.Text>
          <Card.Text>
            <strong>Delivery Time (days):</strong> {gig.delivery}
          </Card.Text>
          <Card.Text>
            <strong>Price Min:</strong> {formatVND(gig.priceMin)}
          </Card.Text>
          {gig.priceMax !== undefined && (
            <Card.Text>
              <strong>Price Max:</strong> {formatVND(gig.priceMax)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Created Date:</strong> {formatDateDisplay(gig.createdDate)}
          </Card.Text>
          
          {/* TODO-05: Nút Back điều hướng về trang trước bằng navigate(-1) */}
                              <Button variant="secondary">Back</Button>
                  </Card.Body>
      </Card>
    </Container>
  )
}
