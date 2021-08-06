import { useState } from "react";
import { PlusLg } from "react-bootstrap-icons";
import { useParams } from "react-router";
import styled from "styled-components";
import useSWR from "swr";
import axios from "axios";

import WordCard from "../components/WordCard";
import WordCardForm from "../components/WordCardForm";

// const vocaburalyList_ = [
//   { id: 1, term: "eye", definition: "ตา" },
//   { id: 2, term: "ear", definition: "หู" },
//   { id: 3, term: "nose", definition: "จมูก" },
// ];

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
  const { id } = useParams();
  const [showWordCardForm, setShowWordCardForm] = useState(false);

  const { data: vocaburalyList } = useSWR(
    `http://localhost:3001/word-set/${id}`,
    (url) => axios.get(url),
  );

  return (
    <div>
      <div className="pt-5 pb-4">
        <h1 className="fw-bold">{vocaburalyList?.data?.title}</h1>
        <p className="text-black-50">{vocaburalyList?.data?.description}</p>
      </div>
      {vocaburalyList?.data?.vocaburaly?.map(({ id, term, definition }) => (
        <WordCard key={id} id={id} term={term} definition={definition} />
      ))}
      {showWordCardForm && <WordCardForm setVisible={setShowWordCardForm} />}
      <StyledDiv onClick={() => setShowWordCardForm(true)}>
        <PlusLg />
      </StyledDiv>
    </div>
  );
};

export default Vocaburaly;
