import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Row, Col, ProgressBar, Carousel } from "react-bootstrap";
import {
  CaretLeftSquareFill,
  CaretRightSquareFill,
} from "react-bootstrap-icons";
import styled from "styled-components";

import { config } from "../config";
import FlipCard from "../components/FlipCard";
import { shuffle } from "../utils/shuffle";

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
  const [token] = useCookies([config.cookieName]);
  const { id } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [vocabularyList, setVocabularySet] = useState([]);

  useEffect(async () => {
    const res = await axios.get(`${config.apiHost}/word-set/${id}`, {
      headers: {
        Authorization: `Bearer ${token[config.cookieName] || ""}`,
      },
    });
    const vocabularyList = res?.data?.vocabulary ?? [];
    setVocabularySet(shuffle(vocabularyList));
  }, []);

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
          onSlide={(eventKey) => {
            setActiveIndex(eventKey);
          }}
        >
          {vocabularyList?.length &&
            vocabularyList.map(({ term, definition }) => (
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
              vocabularyList
                ? (100 * (activeIndex + 1)) / vocabularyList.length
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
