import { useState } from "react";
import { PlusLg } from "react-bootstrap-icons";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import useSWR from "swr";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

import { config } from "../config";
import WordCard from "../components/WordCard";
import WordCardForm from "../components/WordCardForm";
import TrainCard from "../components/TrainCard";

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

const Vocaburaly = () => {
  const [token] = useCookies([config.cookieName]);
  const { id } = useParams();
  const [showWordCardForm, setShowWordCardForm] = useState(false);

  const { data: wordSet, mutate } = useSWR(
    `${config.apiHost}/word-set/${id}`,
    async (url) => {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token[config.cookieName] || ""}`,
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
      `${config.apiHost}/word-set/${id}/vocaburaly`,
      {
        term,
        definition,
      },
      {
        headers: {
          Authorization: `Bearer ${token[config.cookieName] || ""}`,
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
      `${config.apiHost}/word-set/${id}/vocaburaly/${vocaburalyId}`,
      {
        term,
        definition,
      },
      {
        headers: {
          Authorization: `Bearer ${token[config.cookieName] || ""}`,
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
      `${config.apiHost}/word-set/${id}/vocaburaly/${vocaburalyId}`,
      {
        headers: {
          Authorization: `Bearer ${token[config.cookieName] || ""}`,
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
          <TrainCard
            title="Flash card"
            bgColor="#20c997"
            vocaburalyCount={wordSet?.vocaburaly.length}
            vocaburalyMin={2}
            redirectTo={`/${id}/flash-card`}
          />
        </Col>
        <Col>
          <TrainCard
            title="Quiz"
            bgColor="#0dcaf0"
            vocaburalyCount={wordSet?.vocaburaly.length}
            vocaburalyMin={5}
            redirectTo={`/${id}/quiz`}
          />
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
