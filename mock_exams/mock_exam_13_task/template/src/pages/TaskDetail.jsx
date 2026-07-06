import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchTaskById } from '../api/taskApi'
import { useTask } from '../context/TaskContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function TaskDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useTask()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
      // code useEffect ở đây
  
  // TODO-05: Hiển thị Spinner khi loading
      // code Spinner ở đây
  
  // TODO-05: Hiển thị Alert khi lỗi
  
  if (!task) return null

  const typeName = state.projects.find(t => String(t.id) === String(task.projectId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {task.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Priority:</strong> {task.priority}
          </Card.Text>
          <Card.Text>
            <strong>Duration (hours):</strong> {task.duration}
          </Card.Text>
          <Card.Text>
            <strong>Estimated Cost:</strong> {formatVND(task.priceMin)}
          </Card.Text>
          {task.priceMax !== undefined && (
            <Card.Text>
              <strong>Actual Cost:</strong> {formatVND(task.priceMax)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Deadline:</strong> {formatDateDisplay(task.deadline)}
          </Card.Text>
          
          {/* TODO-05: Nút Back điều hướng về trang trước bằng navigate(-1) */}
                              <Button variant="secondary">Back</Button>
                  </Card.Body>
      </Card>
    </Container>
  )
}
