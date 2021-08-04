import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Pencil, Trash } from "react-bootstrap-icons";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 7px #bbbbbb;
  width: 100%;
  padding: 1.2rem 1rem 0.5rem 1rem;
  margin-bottom: 1.25rem;
  &:hover {
    box-shadow: 0px 2px 7px #999999;
  }
`;

const StyledIcon = styled.div`
  display: inline;
  color: gray;
  &:hover {
    color: black;
  }
`;

const WordSet = ({ id: wordSetId, title, description, wordCount }) => {
  const [id] = useState(wordSetId);
  const history = useHistory();

  const handleClick = () => {
    console.log(id);
    history.push(`/${id}`);
  };

  return (
    <StyledDiv onClick={handleClick}>
      <Container>
        <Row className="justify-content-md-center">
          <div className="d-flex justify-content-between">
            <span className="fs-4 fw-bold">{title}</span>
            <div>
              <StyledIcon>
                <Pencil className="ms-2" />
              </StyledIcon>
              <StyledIcon>
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
  );
};

export default WordSet;
