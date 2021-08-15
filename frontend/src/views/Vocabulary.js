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

const Vocabulary = () => {
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

  const addVocabulary = async (term, definition) => {
    mutate({
      ...wordSet,
      vocabulary: [...wordSet.vocabulary, { term, definition }],
    });
    await axios.post(
      `${config.apiHost}/word-set/${id}/vocabulary`,
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

  const editVocabulary = async (vocabularyId, term, definition) => {
    mutate({
      ...wordSet,
      vocabulary: [
        ...wordSet.vocabulary.filter(({ id }) => id !== vocabularyId),
        {
          ...wordSet.vocabulary.find(({ id }) => id === vocabularyId),
          term,
          definition,
        },
      ],
    });
    await axios.patch(
      `${config.apiHost}/word-set/${id}/vocabulary/${vocabularyId}`,
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

  const deleteVocabulary = async (vocabularyId) => {
    mutate({
      ...wordSet,
      vocabulary: wordSet.vocabulary.filter(({ id }) => id !== vocabularyId),
    });
    await axios.delete(
      `${config.apiHost}/word-set/${id}/vocabulary/${vocabularyId}`,
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
            vocabularyCount={wordSet?.vocabulary?.length || 0}
            vocabularyMin={config.flaseCardMinVocab}
            redirectTo={`/${id}/flash-card`}
          />
        </Col>
        <Col>
          <TrainCard
            title="Quiz"
            bgColor="#0dcaf0"
            vocabularyCount={wordSet?.vocabulary?.length || 0}
            vocabularyMin={config.quizMinVocab}
            redirectTo={`/${id}/quiz`}
          />
        </Col>
      </Row>
      {wordSet?.vocabulary?.map(({ id, term, definition }) => (
        <WordCard
          key={id}
          id={id}
          term={term}
          definition={definition}
          editVocabulary={editVocabulary}
          deleteVocabulary={deleteVocabulary}
        />
      ))}
      {showWordCardForm && (
        <WordCardForm
          handleClose={() => setShowWordCardForm(false)}
          handleSubmit={addVocabulary}
        />
      )}
      <StyledDiv onClick={() => setShowWordCardForm(true)}>
        <PlusLg />
      </StyledDiv>
    </div>
  );
};

export default Vocabulary;
