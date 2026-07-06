import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchStudentById } from '../api/studentApi'
import { useStudent } from '../context/StudentContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function StudentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useStudent()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
      // code useEffect ở đây
  
  // TODO-05: Hiển thị Spinner khi loading
      // code Spinner ở đây
  
  // TODO-05: Hiển thị Alert khi lỗi
  
  if (!student) return null

  const typeName = state.departments.find(t => String(t.id) === String(student.departmentId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {student.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Major:</strong> {student.major}
          </Card.Text>
          <Card.Text>
            <strong>GPA:</strong> {student.gpa}
          </Card.Text>
          <Card.Text>
            <strong>Tuition Min:</strong> {formatVND(student.priceMin)}
          </Card.Text>
          {student.priceMax !== undefined && (
            <Card.Text>
              <strong>Tuition Max:</strong> {formatVND(student.priceMax)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Enrollment Date:</strong> {formatDateDisplay(student.enrollmentDate)}
          </Card.Text>
          
          {/* TODO-05: Nút Back điều hướng về trang trước bằng navigate(-1) */}
                              <Button variant="secondary">Back</Button>
                  </Card.Body>
      </Card>
    </Container>
  )
}
