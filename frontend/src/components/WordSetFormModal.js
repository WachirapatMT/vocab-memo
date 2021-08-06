import { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const WordSetFormModal = ({ show, addWordSet, handleClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    addWordSet(title, description);
  };

  const handleCancel = () => {
    handleClose();
    setTitle("");
    setDescription("");
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Create new word set</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="create-word-set-form" ref={formRef} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter the title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" form="create-word-set-form" type="submit">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WordSetFormModal;
