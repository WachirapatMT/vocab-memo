import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({
  show,
  title,
  body,
  buttonText,
  handleConfirm,
  handleCancel,
}) => (
  <Modal show={show} onHide={handleCancel} centered>
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{body}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCancel}>
        Cancel
      </Button>
      <Button variant="danger" onClick={handleConfirm}>
        {buttonText}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmModal;
