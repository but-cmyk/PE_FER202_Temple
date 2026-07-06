import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchMovieById } from '../api/movieApi'
import { useMovie } from '../context/MovieContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useMovie()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
    useEffect(() => {
    fetchMovieById(id)
      .then((data) => {
        setMovie(data)
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
  
  if (!movie) return null

  const typeName = state.categories.find(t => String(t.id) === String(movie.categoryId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {movie.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Director:</strong> {movie.director}
          </Card.Text>
          <Card.Text>
            <strong>Duration (min):</strong> {movie.duration}
          </Card.Text>
          <Card.Text>
            <strong>Ticket Normal:</strong> {formatVND(movie.priceMin)}
          </Card.Text>
          {movie.priceMax !== undefined && (
            <Card.Text>
              <strong>Ticket IMAX:</strong> {formatVND(movie.priceMax)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Release Date:</strong> {formatDateDisplay(movie.releaseDate)}
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
