import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Pencil, Trash } from "react-bootstrap-icons";

import WordCardForm from "./WordCardForm";

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

const StyledIcon = styled.div`
  display: inline;
  color: gray;
  &:hover {
    color: black;
  }
`;

const WordCard = ({
  id: vocaburalyId,
  term,
  definition,
  editVocaburaly,
  deleteVocaburaly,
}) => {
  const [id] = useState(vocaburalyId);
  const [isOnEdit, setIsOnEdit] = useState(false);

  const handleClick = () => {
    console.log(id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsOnEdit(true);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteVocaburaly(id);
  };

  return (
    <React.Fragment>
      {isOnEdit ? (
        <WordCardForm
          defaultTerm={term}
          defaultDefinition={definition}
          setVisible={setIsOnEdit}
          handleSubmit={(term, definition) =>
            editVocaburaly(id, term, definition)
          }
        />
      ) : (
        <StyledDiv onClick={handleClick}>
          <Container>
            <Row>
              <Col xs={3}>
                <span className="fw-bold">{term}</span>
              </Col>
              <Col className="border-start px-4">{definition}</Col>
              <Col xs={1} className="d-flex justify-content-end">
                <StyledIcon onClick={handleEdit}>
                  <Pencil className="ms-2" />
                </StyledIcon>
                <StyledIcon onClick={handleDelete}>
                  <Trash className="ms-2" />
                </StyledIcon>
              </Col>
            </Row>
          </Container>
        </StyledDiv>
      )}
    </React.Fragment>
  );
};

export default WordCard;