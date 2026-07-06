import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import { fetchBookById } from '../api/bookApi'
import { useBook } from '../context/BookContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useBook()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO-05: useEffect fetch thực thể theo id và cập nhật loading/error
      // code useEffect ở đây
  
  // TODO-05: Hiển thị Spinner khi loading
      // code Spinner ở đây
  
  // TODO-05: Hiển thị Alert khi lỗi
  
  if (!book) return null

  const typeName = state.genres.find(t => String(t.id) === String(book.genreId))?.name || 'Unknown'

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
          {book.name}
          <Badge bg="primary">{typeName}</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Author:</strong> {book.author}
          </Card.Text>
          <Card.Text>
            <strong>Pages:</strong> {book.pages}
          </Card.Text>
          <Card.Text>
            <strong>Price Min:</strong> {formatVND(book.priceMin)}
          </Card.Text>
          {book.priceMax !== undefined && (
            <Card.Text>
              <strong>Price Max:</strong> {formatVND(book.priceMax)}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Published Date:</strong> {formatDateDisplay(book.publishedDate)}
          </Card.Text>
          
          {/* TODO-05: Nút Back điều hướng về trang trước bằng navigate(-1) */}
                              <Button variant="secondary">Back</Button>
                  </Card.Body>
      </Card>
    </Container>
  )
}
