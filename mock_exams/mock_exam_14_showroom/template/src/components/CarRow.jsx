import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatVND, formatPriceRange, formatDateDisplay } from '../utils/format'
import ModalConfirm from './ModalConfirm'

export default function CarRow({ car, index, onDelete, canManage }) {
  // TODO-06: useState quản lý showModal
      // code useState ở đây
  
  const handleDeleteConfirm = () => {
            // TODO-06: Gọi onDelete với id và đóng modal
      }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <Link to={`/cars/${car.id}`}>
          {car.name}
        </Link>
      </td>
      <td>{car.engine}</td>
      <td>
        {formatVND(car.priceWeekday)}
        // === SOLUTION_END ===

                —
              </td>
      <td>
        <div className="d-flex gap-2">
          <Link to={`/cars/${car.id}`} className="btn btn-sm btn-info text-white">
            View
          </Link>
          {/* TODO-01, TODO-06: Ẩn hiện nút Delete dựa trên canManage */}
                              <Button variant="danger" size="sm">
            Delete
          </Button>
                  </div>

        {/* TODO-06: ModalConfirm xác nhận xóa */}
              </td>
    </tr>
  )
}
