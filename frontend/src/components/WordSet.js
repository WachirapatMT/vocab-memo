import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Pencil, Trash } from "react-bootstrap-icons";

import { FORM_MODE } from "../constants";
import WordSetFormModal from "./WordSetFormModal";
import ConfirmModal from "./ConfirmModal";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0px 1px 4px #bbbbbb;
  width: 100%;
  padding: 1.2rem 1rem 0.5rem 1rem;
  margin-bottom: 1rem;
  &:hover {
    box-shadow: 0px 1px 6px #999999;
  }
`;

const StyledIcon = styled.div`
  display: inline;
  color: gray;
  &:hover {
    color: black;
  }
`;

const WordSet = ({
  id: wordSetId,
  title,
  description,
  wordCount,
  editWordSet,
  deleteWordSet,
}) => {
  const [id] = useState(wordSetId);
  const [isOnEdit, setIsOnEdit] = useState(false);
  const [isOnDelete, setIsOnDelete] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    history.push(`/${id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsOnEdit(true);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setIsOnDelete(true);
  };

  return (
    <React.Fragment>
      <StyledDiv onClick={handleClick}>
        <Container>
          <Row className="justify-content-md-center">
            <div className="d-flex justify-content-between">
              <span className="fs-4 fw-bold">{title}</span>
              <div>
                <StyledIcon onClick={handleEdit}>
                  <Pencil className="ms-2" />
                </StyledIcon>
                <StyledIcon onClick={handleDelete}>
                  <Trash className="ms-2" />
                </StyledIcon>
              </div>
            </div>
          </Row>
          <Row>
            <div className="d-flex justify-content-between">
              <p className="text-black-50">{description}</p>
              <p className="text-black-50">{wordCount} words</p>
            </div>
          </Row>
        </Container>
      </StyledDiv>
      <WordSetFormModal
        mode={FORM_MODE.EDIT}
        show={isOnEdit}
        defaultTitle={title}
        defaultDescription={description}
        handleSubmit={(title, description) =>
          editWordSet(id, title, description)
        }
        handleClose={() => setIsOnEdit(false)}
      />
      <ConfirmModal
        show={isOnDelete}
        title="Confirm Deletion"
        body="Are you sure you want to delete this word set? This action cannot be undone."
        buttonText="Delete"
        handleConfirm={() => deleteWordSet(id)}
        handleCancel={() => setIsOnDelete(false)}
      />
    </React.Fragment>
  );
};

export default WordSet;
