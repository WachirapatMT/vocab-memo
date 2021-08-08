import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, title, body, handleOk, handleCancel }) => (
  <Modal show={show} onHide={handleCancel} centered>
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{body}</Modal.Body>
    <Modal.Footer className="d-flex justify-content-center">
      <Button variant="warning" onClick={handleOk}>
        <span className="px-3">Ok</span>
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmModal;
