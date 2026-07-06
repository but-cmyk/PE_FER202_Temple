import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Spinner, Alert, Table, Badge } from 'react-bootstrap'
import { fetchCarTypes, fetchCars } from '../api/carApi'
import { formatPriceRange } from '../utils/format'

export default function CarTypeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [carType, setCarType] = useState(null)
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      // TODO-10A: Dùng Promise.all fetch carTypes + cars
      // Tìm carType theo id; nếu không tìm thấy → navigate('/not-found', { replace: true })
      // Lọc cars theo carTypeId, cập nhật state
    }
    load()
  }, [id])

  // TODO-10A: Nếu loading → Spinner; nếu error → Alert danger
  if (loading) return null
  if (error) return null

  return (
    <div>
      {/* TODO-10A: Nút Back navigate('/car-types') */}
      {/* TODO-10A: Card với carType name, Badge id */}
      {/* TODO-10A: Table cars (name, seats, transmission, formatPriceRange, lastServiced) */}
    </div>
  )
}
