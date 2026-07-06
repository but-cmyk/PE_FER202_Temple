export const formatVND = (value) => {
  if (value === undefined || value === null) return '—'
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

export const formatDateDisplay = (dateString) => {
  if (!dateString) return '—'
  return dateString
}

export const formatPriceRange = (min, max) => {
  if (min === 0 && max === 0) return '0 ₫'
  return `${formatVND(min)} – ${formatVND(max)}`
}
