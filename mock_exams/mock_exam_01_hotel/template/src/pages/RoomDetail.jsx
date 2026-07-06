import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchRoomById } from '../api/roomApi'
import { useRoom } from '../context/RoomContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function RoomDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useRoom()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
      // code useEffect ở đây
  
  // TODO-05: Hiển thị Spinner khi loading
      // code Spinner ở đây
  
  // TODO-05: Hiển thị Alert khi lỗi
  
  if (!room) return null

  const typeName = state.roomTypes.find(t => String(t.id) === String(room.roomTypeId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {room.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Bed Type:</strong> {room.bedType}
          </Card.Text>
          <Card.Text>
            <strong>Capacity:</strong> {room.capacity}
          </Card.Text>
          <Card.Text>
            <strong>Price Weekday:</strong> {formatVND(room.priceWeekday)}
          </Card.Text>
          {room.priceWeekend !== undefined && (
            <Card.Text>
              <strong>Price Weekend:</strong> {formatVND(room.priceWeekend)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Last Serviced:</strong> {formatDateDisplay(room.lastServiced)}
          </Card.Text>
          
          {/* TODO-05: Nút Back điều hướng về trang trước bằng navigate(-1) */}
                              <Button variant="secondary">Back</Button>
                  </Card.Body>
      </Card>
    </Container>
  )
}
