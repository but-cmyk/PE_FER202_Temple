import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatVND, formatPriceRange, formatDateDisplay } from '../utils/format'
import ModalConfirm from './ModalConfirm'

export default function LessonRow({ lesson, index, onDelete, canManage }) {
  // TODO-06: useState quản lý showModal
    const [showModal, setShowModal] = useState(false)
    
  const handleDeleteConfirm = () => {
        onDelete(lesson.id)
    setShowModal(false)
          }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <Link to={`/lessons/${lesson.id}`}>
          {lesson.name}
        </Link>
      </td>
      <td>{lesson.type}</td>
      <td>
        {formatPriceRange(lesson.priceMin, lesson.priceMax)}
        
              </td>
      <td>
        <div className="d-flex gap-2">
          <Link to={`/lessons/${lesson.id}`} className="btn btn-sm btn-info text-white">
            View
          </Link>
          {/* TODO-01, TODO-06: Ẩn hiện nút Delete dựa trên canManage */}
                    {canManage && (
            <Button variant="danger" size="sm" onClick={() => setShowModal(true)}>
              Delete
            </Button>
          )}
                            </div>

        {/* TODO-06: ModalConfirm xác nhận xóa */}
                <ModalConfirm
          show={showModal}
          title="Confirm Delete"
          message={
            <span>
              Are you sure you want to delete <strong>{lesson.name}</strong>?
            </span>
          }
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowModal(false)}
        />
              </td>
    </tr>
  )
}
