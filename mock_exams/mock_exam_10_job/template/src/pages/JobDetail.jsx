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
      // code useEffect ở đây
  
  // TODO-05: Hiển thị Spinner khi loading
      // code Spinner ở đây
  
  // TODO-05: Hiển thị Alert khi lỗi
  
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
                              <Button variant="secondary">Back</Button>
                  </Card.Body>
      </Card>
    </Container>
  )
}
