import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchEventById } from '../api/eventApi'
import { useEvent } from '../context/EventContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useEvent()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
      // code useEffect ở đây
  
  // TODO-05: Hiển thị Spinner khi loading
      // code Spinner ở đây
  
  // TODO-05: Hiển thị Alert khi lỗi
  
  if (!event) return null

  const typeName = state.locations.find(t => String(t.id) === String(event.locationId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {event.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Organizer:</strong> {event.organizer}
          </Card.Text>
          <Card.Text>
            <strong>Duration (hours):</strong> {event.duration}
          </Card.Text>
          <Card.Text>
            <strong>Entry Price:</strong> {formatVND(event.priceWeekday)}
          </Card.Text>
          {event.priceWeekend !== undefined && (
            <Card.Text>
              <strong>VIP Price:</strong> {formatVND(event.priceWeekend)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Event Date:</strong> {formatDateDisplay(event.eventDate)}
          </Card.Text>
          
          {/* TODO-05: Nút Back điều hướng về trang trước bằng navigate(-1) */}
                              <Button variant="secondary">Back</Button>
                  </Card.Body>
      </Card>
    </Container>
  )
}
