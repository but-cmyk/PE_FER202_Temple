import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Badge, Button, Spinner, Alert, ListGroup } from 'react-bootstrap'
import { fetchCarById } from '../api/carApi'
import { useCar } from '../context/CarContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function CarDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useCar()
  const { carTypes } = state
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // TODO-05: Gọi fetchCarById(id), cập nhật state car/loading/error
  }, [id])

  // TODO-05: Nếu loading → trả về Spinner
  if (loading) return null
  // TODO-05: Nếu error → trả về Alert variant="danger"
  if (error) return null
  if (!car) return null

  const carTypeName = carTypes.find((rt) => String(rt.id) === String(car.carTypeId))?.name ?? '—'

  return (
    <div>
      {/* TODO-05: Nút Back navigate(-1) */}
      <Card className="shadow-sm">
        <Card.Header as="h4">{/* TODO-05: car.name */}</Card.Header>
        <Card.Body>
          {/* TODO-05: ListGroup với Car Type (Badge), Seats, Transmission,
              Price Weekday (formatVND), Price Weekend (formatVND), Last Serviced (formatDateDisplay) */}
        </Card.Body>
      </Card>
    </div>
  )
}
