import { useState } from "react";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";
import useSWR from "swr";
import axios from "axios";
import { Row, Col, ProgressBar, Carousel } from "react-bootstrap";
import {
  CaretLeftSquareFill,
  CaretRightSquareFill,
} from "react-bootstrap-icons";
import styled from "styled-components";

import { shuffle } from "../utils/shuffle";
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
  const [token] = useCookies([process.env.REACT_APP_COOKIE_NAME]);
  const { id } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: vocaburalyList } = useSWR(
    `http://localhost:3001/word-set/${id}`,
    async (url) => {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${
            token[process.env.REACT_APP_COOKIE_NAME] || ""
          }`,
        },
      });
      const vocaburalyList = res?.data?.vocaburaly ?? [];
      return shuffle(vocaburalyList);
    },
  );
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
          onSlide={(eventKey, direction) => {
            setActiveIndex(eventKey);
          }}
        >
          {vocaburalyList &&
            vocaburalyList.map(({ term, definition }) => (
              <Carousel.Item>
                <div className="d-flex justify-content-center">
                  <FlipCard word={term} definition={definition} />
                </div>
              </Carousel.Item>
            ))}
        </Carousel>
      </Row>
      <Row>
        <Col />
        <Col xs={6}>
          <ProgressBar
            now={
              vocaburalyList
                ? (100 * (activeIndex + 1)) / vocaburalyList.length
                : 0
            }
          />
        </Col>
        <Col />
      </Row>
    </StyledDiv>
  );
};

export default FlashCard;
