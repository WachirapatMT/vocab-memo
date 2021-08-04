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
  &:hover {
    box-shadow: 0px 0px 3px #999999;
  }
`;

const StyledButton = styled.button`
  color: gray;
  border: none;
`;

const StyledIcon = styled.div`
  display: inline;
  color: gray;
  &:hover {
    color: black;
  }
`;

const WordCardForm = ({ setVisible }) => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");

  const handleSubmit = () => {
    console.log(definition, word);
  };

  const handleCancel = () => {
    setVisible(false);
    setWord("");
    setDefinition("");
  };

  return (
    <StyledDiv>
      <Container>
        <Form>
          <Row>
            <Col xs={3}>
              <Form.Control
                required
                size="sm"
                type="text"
                placeholder="Enter the word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
              />
            </Col>
            <Col className="border-start px-4">
              <Form.Control
                required
                size="sm"
                type="text"
                placeholder="Enter the definition"
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
              />
            </Col>
            <Col xs={1} className="d-flex justify-content-end">
              <StyledIcon onClick={handleSubmit}>
                <CheckLg className="ms-2" />
              </StyledIcon>
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
