import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchAppointmentById } from '../api/appointmentApi'
import { useAppointment } from '../context/AppointmentContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function AppointmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useAppointment()
  const [appointment, setAppointment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
      // code useEffect ở đây
  
  // TODO-05: Hiển thị Spinner khi loading
      // code Spinner ở đây
  
  // TODO-05: Hiển thị Alert khi lỗi
  
  if (!appointment) return null

  const typeName = state.doctors.find(t => String(t.id) === String(appointment.doctorId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {appointment.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Patient Name:</strong> {appointment.patient}
          </Card.Text>
          <Card.Text>
            <strong>Duration (min):</strong> {appointment.duration}
          </Card.Text>
          <Card.Text>
            <strong>Fee Normal:</strong> {formatVND(appointment.priceMin)}
          </Card.Text>
          {appointment.priceMax !== undefined && (
            <Card.Text>
              <strong>Fee Specialist:</strong> {formatVND(appointment.priceMax)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Appointment Date:</strong> {formatDateDisplay(appointment.appointmentDate)}
          </Card.Text>
          
          {/* TODO-05: Nút Back điều hướng về trang trước bằng navigate(-1) */}
                              <Button variant="secondary">Back</Button>
                  </Card.Body>
      </Card>
    </Container>
  )
}
