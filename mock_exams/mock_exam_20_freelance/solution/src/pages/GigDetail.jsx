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
    useEffect(() => {
    fetchGigById(id)
      .then((data) => {
        setGig(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load details.')
        setLoading(false)
      })
  }, [id])
    
  // TODO-05: Hiển thị Spinner khi loading
    if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />
  }
    
  // TODO-05: Hiển thị Alert khi lỗi
    if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger" role="alert">{error}</Alert>
      </Container>
    )
  }
  
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
                    <Button variant="secondary" onClick={() => navigate(-1)}>
            ← Back
          </Button>
                            </Card.Body>
      </Card>
    </Container>
  )
}
