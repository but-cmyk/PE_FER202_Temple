import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchEmployeeById } from '../api/employeeApi'
import { useEmployee } from '../context/EmployeeContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function EmployeeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useEmployee()
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
    useEffect(() => {
    fetchEmployeeById(id)
      .then((data) => {
        setEmployee(data)
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
  
  if (!employee) return null

  const typeName = state.departments.find(t => String(t.id) === String(employee.departmentId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {employee.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Job Role:</strong> {employee.role}
          </Card.Text>
          <Card.Text>
            <strong>Experience (years):</strong> {employee.experience}
          </Card.Text>
          <Card.Text>
            <strong>Monthly Salary:</strong> {formatVND(employee.priceWeekday)}
          </Card.Text>
          {employee.priceWeekend !== undefined && (
            <Card.Text>
              <strong>Overtime Rate:</strong> {formatVND(employee.priceWeekend)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Start Date:</strong> {formatDateDisplay(employee.startDate)}
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
