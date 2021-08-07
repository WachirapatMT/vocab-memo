import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const WordSetFormModal = ({
  mode,
  show,
  defaultTitle = "",
  defaultDescription = "",
  handleSubmit,
  handleClose,
}) => {
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleClose();
    handleSubmit(title, description);
    setTitle(defaultTitle);
    setDescription(defaultDescription);
  };

  const handleCancel = () => {
    handleClose();
    setTitle(defaultTitle);
    setDescription(defaultDescription);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>{mode} word set</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="create-word-set-form" onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter the title"
              defaultValue={defaultTitle}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              defaultValue={defaultDescription}
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
          {mode}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WordSetFormModal;
