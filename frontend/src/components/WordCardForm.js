import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import styled from "styled-components";
import { CheckLg, XLg } from "react-bootstrap-icons";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 2px #bbbbbb;
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin-bottom: 0.5rem;
`;

const StyledButton = styled.button`
  position: relative;
  top: -2px;
  padding: 0px;
  margin: 0px;
  border: none;
  background-color: transparent;
  color: gray;
  &:hover {
    color: green;
  }
`;

const StyledIcon = styled.div`
  display: inline;
  color: gray;
  &:hover {
    color: red;
  }
`;

const WordCardForm = ({
  defaultTerm = "",
  defaultDefinition = "",
  handleClose,
  handleSubmit,
}) => {
  const [term, setTerm] = useState(defaultTerm);
  const [definition, setDefinition] = useState(defaultDefinition);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit(term, definition);
    handleClose();
    setTerm(defaultTerm);
    setDefinition(defaultDefinition);
  };

  const handleCancel = () => {
    handleClose();
    setTerm(defaultTerm);
    setDefinition(defaultDefinition);
  };

  return (
    <StyledDiv>
      <Container>
        <Form onSubmit={handleSubmitForm}>
          <Row>
            <Col xs={3}>
              <Form.Control
                required
                size="sm"
                type="text"
                placeholder="Enter the word"
                defaultValue={defaultTerm}
                onChange={(e) => setTerm(e.target.value)}
              />
            </Col>
            <Col className="border-start px-4">
              <Form.Control
                required
                size="sm"
                type="text"
                placeholder="Enter the definition"
                defaultValue={defaultDefinition}
                onChange={(e) => setDefinition(e.target.value)}
              />
            </Col>
            <Col xs={1} className="d-flex justify-content-end">
              <StyledButton>
                <CheckLg className="ms-2" />
              </StyledButton>
              <StyledIcon onClick={handleCancel}>
                <XLg className="ms-2" />
              </StyledIcon>
            </Col>
          </Row>
        </Form>
      </Container>
    </StyledDiv>
  );
};

export default WordCardForm;
