import { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router";
import { useCookies } from "react-cookie";
import axios from "axios";
import { InputGroup, FormControl, Button, ProgressBar } from "react-bootstrap";
import styled from "styled-components";

import { config } from "../config";
import { shuffle } from "../utils/shuffle";

const StyledDiv = styled.div`
  height: 100vh;
  max-height: 500px;
  margin: 9vh 3rem 0px 3rem;
`;

const StyledInnerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7rem 0px;
  font-weight: bold;
  font-size: 2.5rem;
`;

const StyledInputDiv = styled.div`
  width: 30rem;
`;

const Quiz = () => {
  const history = useHistory();
  const [token] = useCookies([config.cookieName]);
  const { id } = useParams();
  const [vocabularyList, setVocabularySet] = useState([]);
  const [currentVocabularyIndex, setCurrentVocabularyIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const isReadOnly = useRef(false);

  useEffect(async () => {
    const res = await axios.get(`${config.apiHost}/word-set/${id}`, {
      headers: {
        Authorization: `Bearer ${token[config.cookieName] || ""}`,
      },
    });
    const vocabularyList = res?.data?.vocabulary ?? [];
    setVocabularySet(shuffle(vocabularyList));
  }, []);

  const handleType = (e) => {
    setAnswer(e.target.value);
    checkAnswer(e.target.value);
  };

  const handleHint = () => {
    for (
      let i = 0;
      i < vocabularyList[currentVocabularyIndex].definition.length;
      i++
    ) {
      if (
        i > answer.length - 1 ||
        vocabularyList[currentVocabularyIndex].definition[i] !== answer[i]
      ) {
        setAnswer(
          vocabularyList[currentVocabularyIndex].definition.substring(0, i + 1),
        );
        checkAnswer(
          vocabularyList[currentVocabularyIndex].definition.substring(0, i + 1),
        );
        break;
      }
    }
  };

  const checkAnswer = (string) => {
    if (string === vocabularyList[currentVocabularyIndex].definition) {
      isReadOnly.current = true;
      if (currentVocabularyIndex + 1 >= vocabularyList.length) {
        setTimeout(() => {
          history.push(`/${id}`);
        }, 1000);
      } else {
        setTimeout(() => {
          isReadOnly.current = false;
          setAnswer("");
          setCurrentVocabularyIndex(currentVocabularyIndex + 1);
        }, 1000);
      }
    }
  };

  return (
    <StyledDiv>
      <ProgressBar
        className="mx-5"
        now={
          vocabularyList
            ? (100 * currentVocabularyIndex) / vocabularyList.length
            : 0
        }
      />
      <StyledInnerDiv>
        {vocabularyList.length
          ? vocabularyList[currentVocabularyIndex].term
          : "Loading..."}
      </StyledInnerDiv>
      <div className="d-flex justify-content-center">
        <StyledInputDiv>
          <InputGroup>
            <FormControl
              className={isReadOnly.current && "fw-bold text-success"}
              placeholder="Enter definition"
              onChange={handleType}
              value={answer}
              readOnly={isReadOnly.current}
            />
            <Button variant="outline-secondary" onClick={handleHint}>
              Hint
            </Button>
          </InputGroup>
        </StyledInputDiv>
      </div>
    </StyledDiv>
  );
};

export default Quiz;
