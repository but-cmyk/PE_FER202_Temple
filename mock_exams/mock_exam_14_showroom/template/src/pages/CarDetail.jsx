import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchCarById } from '../api/carApi'
import { useCar } from '../context/CarContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function CarDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useCar()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
      // code useEffect ở đây
  
  // TODO-05: Hiển thị Spinner khi loading
      // code Spinner ở đây
  
  // TODO-05: Hiển thị Alert khi lỗi
  
  if (!car) return null

  const typeName = state.dealers.find(t => String(t.id) === String(car.dealerId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {car.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Engine Type:</strong> {car.engine}
          </Card.Text>
          <Card.Text>
            <strong>Model Year:</strong> {car.year}
          </Card.Text>
          <Card.Text>
            <strong>MSRP Price:</strong> {formatVND(car.priceWeekday)}
          </Card.Text>
          {car.priceWeekend !== undefined && (
            <Card.Text>
              <strong>Dealer Price:</strong> {formatVND(car.priceWeekend)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Received Date:</strong> {formatDateDisplay(car.receivedDate)}
          </Card.Text>
          
          {/* TODO-05: Nút Back điều hướng về trang trước bằng navigate(-1) */}
                              <Button variant="secondary">Back</Button>
                  </Card.Body>
      </Card>
    </Container>
  )
}
