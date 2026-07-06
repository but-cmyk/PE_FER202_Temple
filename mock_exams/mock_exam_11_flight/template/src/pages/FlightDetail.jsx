import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchFlightById } from '../api/flightApi'
import { useFlight } from '../context/FlightContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function FlightDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useFlight()
  const [flight, setFlight] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
      // code useEffect ở đây
  
  // TODO-05: Hiển thị Spinner khi loading
      // code Spinner ở đây
  
  // TODO-05: Hiển thị Alert khi lỗi
  
  if (!flight) return null

  const typeName = state.airlines.find(t => String(t.id) === String(flight.airlineId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {flight.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Aircraft:</strong> {flight.aircraft}
          </Card.Text>
          <Card.Text>
            <strong>Duration (hours):</strong> {flight.duration}
          </Card.Text>
          <Card.Text>
            <strong>Eco Price:</strong> {formatVND(flight.priceWeekday)}
          </Card.Text>
          {flight.priceWeekend !== undefined && (
            <Card.Text>
              <strong>Business Price:</strong> {formatVND(flight.priceWeekend)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Flight Date:</strong> {formatDateDisplay(flight.flightDate)}
          </Card.Text>
          
          {/* TODO-05: Nút Back điều hướng về trang trước bằng navigate(-1) */}
                              <Button variant="secondary">Back</Button>
                  </Card.Body>
      </Card>
    </Container>
  )
}
