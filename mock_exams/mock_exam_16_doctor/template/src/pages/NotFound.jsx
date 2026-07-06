import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Container className="text-center mt-5 py-5">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="lead text-muted mb-4">
        The page you are looking for does not exist or has been moved.
      </p>
      {/* TODO-09: Nút Back to Home */}
                  <Button variant="primary">Home</Button>
          </Container>
  )
}
