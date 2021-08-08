import { Row, Col, ProgressBar } from "react-bootstrap";
import {
  CaretLeftSquareFill,
  CaretRightSquareFill,
} from "react-bootstrap-icons";
import styled from "styled-components";

const StyledDiv = styled.div`
  height: 50vw;
  max-height: 500px;
  width: 80vw;
  margin: 15vh 3rem 0px 3rem;
`;

const StyledMidDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
  box-shadow: 0px 0px 2px #cccccc;
  height: 100%;
  width: 100%;
  &:hover {
    background-color: #dddddd;
  }
`;

const StyledSideDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const StyledIcon = styled.div`
  opacity: 0.5;
  &:hover {
    opacity: 0.9;
  }
`;

const FlashCard = () => {
  return (
    <StyledDiv>
      <Row className="h-75 mb-5">
        <Col>
          <StyledSideDiv>
            <StyledIcon>
              <CaretLeftSquareFill size={40} />
            </StyledIcon>
          </StyledSideDiv>
        </Col>
        <Col xs={8}>
          <StyledMidDiv>Card</StyledMidDiv>
        </Col>
        <Col>
          <StyledSideDiv>
            <StyledIcon>
              <CaretRightSquareFill size={40} />
            </StyledIcon>
          </StyledSideDiv>
        </Col>
      </Row>
      <Row>
        <Col />
        <Col xs={6}>
          <ProgressBar now={20} />
        </Col>
        <Col />
      </Row>
    </StyledDiv>
  );
};

export default FlashCard;
