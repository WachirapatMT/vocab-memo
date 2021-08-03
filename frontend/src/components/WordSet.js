import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Pencil, Trash } from "react-bootstrap-icons";

import Layout from "../containers/Layout";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 7px #bbbbbb;
  width: 100%;

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

const WordSet = () => (
  <StyledDiv className="px-4 py-3">
    <Container>
      <Row className="justify-content-md-center">
        <div className="d-flex justify-content-between">
          <span className="fs-4 fw-bold">title</span>
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
          <p className="text-black-50">description</p>
          <p className="text-black-50">50 words</p>
        </div>
      </Row>
    </Container>
  </StyledDiv>
);

export default WordSet;
