import { Navbar, Container, Nav, Badge, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import about from '../data/about'

export default function AppNavbar() {
  const { user, isAuthenticated, logoutUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
        logoutUser()
    navigate('/login')
          }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* TODO-04: Brand click -> navigate về / bằng as={Link} to="/" */}
                <Navbar.Brand as={Link} to="/">
          <img
            src={about.logo}
            alt="logo"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          {about.appName}
        </Navbar.Brand>
                
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/locations">Manage Locations</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {/* TODO-02: Hiển thị user.email (bold, white) + Badge role */}
            {isAuthenticated && user && (
              <div className="d-flex align-items-center gap-2">
                                <span className="text-white fw-bold me-2">
                  {user.email}
                </span>
                <Badge bg="info" className="me-2">{user.role}</Badge>
                                                
                {/* TODO-03: Nút Logout chỉ hiển thị khi đã đăng nhập */}
                                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
                                              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
