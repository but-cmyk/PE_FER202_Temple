import { Navbar, Container, Nav, Badge, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import about from '../data/about'

export default function AppNavbar() {
  const { user, isAuthenticated, logoutUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
            // TODO-03: Gọi logoutUser và navigate đến /login
      }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* TODO-04: Brand click -> navigate về / bằng as={Link} to="/" */}
                        <Navbar.Brand href="#">
          <img
            src="/logo.png"
            alt="logo"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          App Brand
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/projects">Manage Projects</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {/* TODO-02: Hiển thị user.fullName (bold, white) + Badge role */}
            {isAuthenticated && user && (
              <div className="d-flex align-items-center gap-2">
                                                {/* code hiển thị thông tin user ở đây */}
                                
                {/* TODO-03: Nút Logout chỉ hiển thị khi đã đăng nhập */}
                                                {/* code nút Logout ở đây */}
                              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
