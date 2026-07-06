import { useState } from 'react'
import { Container, Table, Button, Form, Alert, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useGymClass } from '../context/GymClassContext'
import { addTrainer, deleteTrainer, fetchGymClasses } from '../api/gymClassApi'
import ModalConfirm from '../components/ModalConfirm'

export default function ManageTrainers() {
  const { state, dispatch } = useGymClass()
  const { trainers, loading } = state
  const [typeName, setTypeName] = useState('')
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [targetType, setTargetType] = useState(null)

  const handleAdd = async (e) => {
    e.preventDefault()
    setError('')
    // TODO-10A: Validation tên danh mục dài >= 3 và không được trùng (case-insensitive)
            // code xử lý thêm mới ở đây
      }

  const handleDeleteClick = (type) => {
    setTargetType(type)
    setShowModal(true)
  }

  const handleDeleteConfirm = async () => {
    setError('')
    // TODO-10B: Kiểm tra xem loại danh mục này có đang chứa thực thể con nào không trước khi xóa
            // code xác nhận xóa ở đây
      }

  if (loading) return <div className="text-center mt-5">Loading...</div>

  return (
    <Container className="mt-4">
      <h2>Manage Trainers</h2>
      
      {error && <Alert variant="danger" role="alert">{error}</Alert>}

      <Form onSubmit={handleAdd} className="row g-3 mb-4">
        <Col md={6}>
          <Form.Control
            required
            placeholder="placeholder-placeholder"
            placeholder="e.g. Buffet"
            value={typeName}
            onChange={e => setTypeName(e.target.value)}
          />
        </Col>
        <Col md={auto => 'auto'}>
          <Button type="submit" variant="primary">Add</Button>
        </Col>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((t, idx) => (
            <tr key={t.id}>
              <td>{idx + 1}</td>
              <td>
                <Link to={`/trainers/${t.id}`}>{t.name}</Link>
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDeleteClick(t)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {targetType && (
        <ModalConfirm
          show={showModal}
          title="Confirm Delete Type"
          message={
            <span>
              Are you sure you want to delete category <strong>{targetType.name}</strong>?
            </span>
          }
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </Container>
  )
}
