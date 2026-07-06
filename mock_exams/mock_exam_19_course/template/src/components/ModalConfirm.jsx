import { Modal, Button } from 'react-bootstrap'

export default function ModalConfirm({ show, title, message, onConfirm, onCancel, confirmText = 'Delete' }) {
  return (
    <Modal show={show} onHide={onCancel} role="dialog">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
