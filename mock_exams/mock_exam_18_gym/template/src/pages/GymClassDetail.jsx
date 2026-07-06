import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchGymClassById } from '../api/gymClassApi'
import { useGymClass } from '../context/GymClassContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function GymClassDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useGymClass()
  const [gymClass, setGymClass] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
      // code useEffect ở đây
  
  // TODO-05: Hiển thị Spinner khi loading
      // code Spinner ở đây
  
  // TODO-05: Hiển thị Alert khi lỗi
  
  if (!gymClass) return null

  const typeName = state.trainers.find(t => String(t.id) === String(gymClass.trainerId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {gymClass.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Level:</strong> {gymClass.level}
          </Card.Text>
          <Card.Text>
            <strong>Max Capacity:</strong> {gymClass.capacity}
          </Card.Text>
          <Card.Text>
            <strong>Weekday Fee:</strong> {formatVND(gymClass.priceWeekday)}
          </Card.Text>
          {gymClass.priceWeekend !== undefined && (
            <Card.Text>
              <strong>Weekend Fee:</strong> {formatVND(gymClass.priceWeekend)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Start Date:</strong> {formatDateDisplay(gymClass.startDate)}
          </Card.Text>
          
          {/* TODO-05: Nút Back điều hướng về trang trước bằng navigate(-1) */}
                              <Button variant="secondary">Back</Button>
                  </Card.Body>
      </Card>
    </Container>
  )
}
