import { Row, Col, ProgressBar, Carousel } from "react-bootstrap";
import {
  CaretLeftSquareFill,
  CaretRightSquareFill,
} from "react-bootstrap-icons";
import styled from "styled-components";

import FlipCard from "../components/FlipCard";

const StyledDiv = styled.div`
  height: 100vh;
  max-height: 500px;
  margin: 9vh 3rem 0px 3rem;
`;

const StyledIcon = styled.div`
  position: relative;
  ${(props) => props.direction}: -3rem;
  color: black;
  opacity: 0.5;
  &:hover {
    opacity: 0.9;
  }
`;

const FlashCard = () => {
  return (
    <StyledDiv>
      <Row className="mb-5">
        <Carousel
          interval={null}
          prevIcon={
            <StyledIcon direction="left">
              <CaretLeftSquareFill size={40} />
            </StyledIcon>
          }
          prevLabel=""
          nextIcon={
            <StyledIcon direction="right">
              <CaretRightSquareFill size={40} />
            </StyledIcon>
          }
          nextLabel=""
        >
          <Carousel.Item>
            <div className="d-flex justify-content-center">
              <FlipCard word="Elephant" definition="ช้าง" />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex justify-content-center">
              <FlipCard word="Lion" definition="สิงโต" />
            </div>
          </Carousel.Item>
        </Carousel>
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
