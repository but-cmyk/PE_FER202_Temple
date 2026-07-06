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
      // code useEffect ở đây
  
  // TODO-05: Hiển thị Spinner khi loading
      // code Spinner ở đây
  
  // TODO-05: Hiển thị Alert khi lỗi
  
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
                              <Button variant="secondary">Back</Button>
                  </Card.Body>
      </Card>
    </Container>
  )
}
