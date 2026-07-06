import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchRecipeById } from '../api/recipeApi'
import { useRecipe } from '../context/RecipeContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function RecipeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useRecipe()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
      // code useEffect ở đây
  
  // TODO-05: Hiển thị Spinner khi loading
      // code Spinner ở đây
  
  // TODO-05: Hiển thị Alert khi lỗi
  
  if (!recipe) return null

  const typeName = state.cuisines.find(t => String(t.id) === String(recipe.cuisineId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {recipe.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Difficulty:</strong> {recipe.difficulty}
          </Card.Text>
          <Card.Text>
            <strong>Prep Time (min):</strong> {recipe.prepTime}
          </Card.Text>
          <Card.Text>
            <strong>Cost Min:</strong> {formatVND(recipe.priceMin)}
          </Card.Text>
          {recipe.priceMax !== undefined && (
            <Card.Text>
              <strong>Cost Max:</strong> {formatVND(recipe.priceMax)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Created Date:</strong> {formatDateDisplay(recipe.createdDate)}
          </Card.Text>
          
          {/* TODO-05: Nút Back điều hướng về trang trước bằng navigate(-1) */}
                              <Button variant="secondary">Back</Button>
                  </Card.Body>
      </Card>
    </Container>
  )
}
