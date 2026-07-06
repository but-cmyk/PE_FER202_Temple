import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Table, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchArtists, fetchSongs } from '../api/songApi'
import { formatVND } from '../utils/format'

export default function ArtistDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [type, setType] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-09 hoặc TODO-10A: fetch song song hai bảng bằng Promise.all
    useEffect(() => {
    Promise.all([fetchArtists(), fetchSongs()])
      .then(([typesData, itemsData]) => {
        const found = typesData.find(t => String(t.id) === String(id))
        if (!found) {
          setError('Category not found.')
          setLoading(false)
          // Đề mẫu 2: Redirect sang 404
          if ('C1' === 'C2' || 'C1' === 'C1') {
             navigate('/not-found', { replace: true })
          }
          return
        }
        setType(found)
        setItems(itemsData.filter(item => String(item.artistId) === String(id)))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message || 'Error loading details.')
        setLoading(false)
      })
  }, [id])
    
  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger" role="alert">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>
          Category: <Badge bg="primary">{type?.name}</Badge>
        </h2>
        {/* TODO-09 hoặc TODO-10A: nút Back to Categories */}
                <Button variant="secondary" onClick={() => navigate('/artists')}>
          ← Back to Artists
        </Button>
                      </div>

      <h5>Total items in this category: {items.length}</h5>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Album</th>
            <th>Lượt nghe (k)</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>{item.album}</td>
              <td>{item.plays}</td>
              <td>{formatVND(item.priceWeekday)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
