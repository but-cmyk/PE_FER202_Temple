import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchJobById } from '../api/jobApi'
import { useJob } from '../context/JobContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useJob()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
    useEffect(() => {
    fetchJobById(id)
      .then((data) => {
        setJob(data)
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
  
  if (!job) return null

  const typeName = state.companies.find(t => String(t.id) === String(job.companyId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {job.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Location:</strong> {job.location}
          </Card.Text>
          <Card.Text>
            <strong>Experience Required (yrs):</strong> {job.experience}
          </Card.Text>
          <Card.Text>
            <strong>Salary Min:</strong> {formatVND(job.priceMin)}
          </Card.Text>
          {job.priceMax !== undefined && (
            <Card.Text>
              <strong>Salary Max:</strong> {formatVND(job.priceMax)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Posted Date:</strong> {formatDateDisplay(job.postedDate)}
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
