import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchSongById } from '../api/songApi'
import { useSong } from '../context/SongContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function SongDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useSong()
  const [song, setSong] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
    useEffect(() => {
    fetchSongById(id)
      .then((data) => {
        setSong(data)
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
  
  if (!song) return null

  const typeName = state.artists.find(t => String(t.id) === String(song.artistId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {song.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Album:</strong> {song.album}
          </Card.Text>
          <Card.Text>
            <strong>Lượt nghe (k):</strong> {song.plays}
          </Card.Text>
          <Card.Text>
            <strong>Production Cost:</strong> {formatVND(song.priceWeekday)}
          </Card.Text>
          {song.priceWeekend !== undefined && (
            <Card.Text>
              <strong>Royalty Fee:</strong> {formatVND(song.priceWeekend)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Release Date:</strong> {formatDateDisplay(song.releaseDate)}
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
