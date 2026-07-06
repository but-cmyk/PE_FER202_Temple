import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchLessonById } from '../api/lessonApi'
import { useLesson } from '../context/LessonContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function LessonDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useLesson()
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
      // code useEffect ở đây
  
  // TODO-05: Hiển thị Spinner khi loading
      // code Spinner ở đây
  
  // TODO-05: Hiển thị Alert khi lỗi
  
  if (!lesson) return null

  const typeName = state.modules.find(t => String(t.id) === String(lesson.moduleId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {lesson.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Lesson Type:</strong> {lesson.type}
          </Card.Text>
          <Card.Text>
            <strong>Duration (min):</strong> {lesson.duration}
          </Card.Text>
          <Card.Text>
            <strong>Access Fee Min:</strong> {formatVND(lesson.priceMin)}
          </Card.Text>
          {lesson.priceMax !== undefined && (
            <Card.Text>
              <strong>Access Fee Max:</strong> {formatVND(lesson.priceMax)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Released Date:</strong> {formatDateDisplay(lesson.releasedDate)}
          </Card.Text>
          
          {/* TODO-05: Nút Back điều hướng về trang trước bằng navigate(-1) */}
                              <Button variant="secondary">Back</Button>
                  </Card.Body>
      </Card>
    </Container>
  )
}
