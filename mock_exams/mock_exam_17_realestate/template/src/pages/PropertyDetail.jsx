import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchPropertyById } from '../api/propertyApi'
import { useProperty } from '../context/PropertyContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function PropertyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useProperty()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
      // code useEffect ở đây
  
  // TODO-05: Hiển thị Spinner khi loading
      // code Spinner ở đây
  
  // TODO-05: Hiển thị Alert khi lỗi
  
  if (!property) return null

  const typeName = state.agents.find(t => String(t.id) === String(property.agentId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {property.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Status:</strong> {property.status}
          </Card.Text>
          <Card.Text>
            <strong>Area (sqm):</strong> {property.area}
          </Card.Text>
          <Card.Text>
            <strong>Price Base:</strong> {formatVND(property.priceMin)}
          </Card.Text>
          {property.priceMax !== undefined && (
            <Card.Text>
              <strong>Price Target:</strong> {formatVND(property.priceMax)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Listed Date:</strong> {formatDateDisplay(property.listedDate)}
          </Card.Text>
          
          {/* TODO-05: Nút Back điều hướng về trang trước bằng navigate(-1) */}
                              <Button variant="secondary">Back</Button>
                  </Card.Body>
      </Card>
    </Container>
  )
}
