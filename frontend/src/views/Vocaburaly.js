import { useState } from "react";
import { PlusLg } from "react-bootstrap-icons";
import { useParams } from "react-router";
import styled from "styled-components";

import WordCard from "../components/WordCard";

const vocaburalyList_ = [
  { id: 1, term: "eye", definition: "ตา" },
  { id: 2, term: "ear", definition: "หู" },
  { id: 3, term: "nose", definition: "จมูก" },
];

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

  const [vocaburalyList, setVocaburalyList] = useState(vocaburalyList_);

  return (
    <div>
      <div className="pt-5 pb-4">
        <h1 className="fw-bold">Word set Title {id}</h1>
      </div>
      {vocaburalyList.map(({ id, term, definition }) => (
        <WordCard key={id} id={id} term={term} definition={definition} />
      ))}
      <StyledDiv>
        <PlusLg />
      </StyledDiv>
    </div>
  );
};

export default Vocaburaly;
