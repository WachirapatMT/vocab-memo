import { useState } from "react";
import { PlusLg } from "react-bootstrap-icons";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import useSWR from "swr";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

import WordCard from "../components/WordCard";
import WordCardForm from "../components/WordCardForm";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
  box-shadow: 0px 0px 2px #cccccc;
  height: 3rem;
  width: 100%;
  margin-bottom: 1.25rem;
  &:hover {
    background-color: #dddddd;
  }
`;

const StyledCard = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  box-shadow: 0px 0px 2px #cccccc;
  background-color: ${(props) => props.bg};
  border-radius: 10px;
  &:hover {
    box-shadow: 0px 0px 4px #aaaaaa;
    opacity: 0.9;
  }
`;

const Vocaburaly = () => {
  const [token] = useCookies([process.env.REACT_APP_COOKIE_NAME]);
  const { id } = useParams();
  const [showWordCardForm, setShowWordCardForm] = useState(false);

  const { data: wordSet, mutate } = useSWR(
    `http://localhost:3001/word-set/${id}`,
    async (url) => {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${
            token[process.env.REACT_APP_COOKIE_NAME] || ""
          }`,
        },
      });
      return res?.data ?? [];
    },
  );

  const addVocaburaly = async (term, definition) => {
    mutate({
      ...wordSet,
      vocaburaly: [...wordSet.vocaburaly, { term, definition }],
    });
    await axios.post(
      `http://localhost:3001/word-set/${id}/vocaburaly`,
      {
        term,
        definition,
      },
      {
        headers: {
          Authorization: `Bearer ${
            token[process.env.REACT_APP_COOKIE_NAME] || ""
          }`,
        },
      },
    );
    mutate();
  };

  const editVocaburaly = async (vocaburalyId, term, definition) => {
    mutate({
      ...wordSet,
      vocaburaly: [
        ...wordSet.vocaburaly.filter(({ id }) => id !== vocaburalyId),
        {
          ...wordSet.vocaburaly.find(({ id }) => id === vocaburalyId),
          term,
          definition,
        },
      ],
    });
    await axios.patch(
      `http://localhost:3001/word-set/${id}/vocaburaly/${vocaburalyId}`,
      {
        term,
        definition,
      },
      {
        headers: {
          Authorization: `Bearer ${
            token[process.env.REACT_APP_COOKIE_NAME] || ""
          }`,
        },
      },
    );
    mutate();
  };

  const deleteVocaburaly = async (vocaburalyId) => {
    mutate({
      ...wordSet,
      vocaburaly: wordSet.vocaburaly.filter(({ id }) => id !== vocaburalyId),
    });
    await axios.delete(
      `http://localhost:3001/word-set/${id}/vocaburaly/${vocaburalyId}`,
      {
        headers: {
          Authorization: `Bearer ${
            token[process.env.REACT_APP_COOKIE_NAME] || ""
          }`,
        },
      },
    );
    mutate();
  };

  return (
    <div>
      <div className="pt-5 pb-4">
        <h1 className="fw-bold">{wordSet?.title}</h1>
        <p className="text-black-50">{wordSet?.description}</p>
      </div>
      <Row className="mb-5">
        <Col>
          <StyledCard bg="#20c997">Flash card</StyledCard>
        </Col>
        <Col>
          <StyledCard bg="#0dcaf0">Quiz</StyledCard>
        </Col>
      </Row>
      {wordSet?.vocaburaly?.map(({ id, term, definition }) => (
        <WordCard
          key={id}
          id={id}
          term={term}
          definition={definition}
          editVocaburaly={editVocaburaly}
          deleteVocaburaly={deleteVocaburaly}
        />
      ))}
      {showWordCardForm && (
        <WordCardForm
          handleClose={() => setShowWordCardForm(false)}
          handleSubmit={addVocaburaly}
        />
      )}
      <StyledDiv onClick={() => setShowWordCardForm(true)}>
        <PlusLg />
      </StyledDiv>
    </div>
  );
};

export default Vocaburaly;
