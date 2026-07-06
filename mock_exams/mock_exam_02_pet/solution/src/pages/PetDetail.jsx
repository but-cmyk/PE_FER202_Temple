import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchPetById } from '../api/petApi'
import { usePet } from '../context/PetContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function PetDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = usePet()
  const [pet, setPet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
    useEffect(() => {
    fetchPetById(id)
      .then((data) => {
        setPet(data)
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
  
  if (!pet) return null

  const typeName = state.breeds.find(t => String(t.id) === String(pet.breedId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {pet.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Owner Name:</strong> {pet.owner}
          </Card.Text>
          <Card.Text>
            <strong>Age (months):</strong> {pet.age}
          </Card.Text>
          <Card.Text>
            <strong>Weekday Fee:</strong> {formatVND(pet.priceWeekday)}
          </Card.Text>
          {pet.priceWeekend !== undefined && (
            <Card.Text>
              <strong>Weekend Fee:</strong> {formatVND(pet.priceWeekend)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Last Vaccinated:</strong> {formatDateDisplay(pet.lastVaccinated)}
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
