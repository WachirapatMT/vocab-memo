import { useState } from "react";
import { PlusLg } from "react-bootstrap-icons";
import { useParams } from "react-router";
import styled from "styled-components";

const vocabList_ = [
  { id: 1, word: "eye", definition: "ตา" },
  { id: 2, word: "ear", definition: "หู" },
  { id: 3, word: "nose", definition: "จมูก" },
];

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
  box-shadow: 0px 2px 7px #cccccc;
  height: 3rem;
  width: 100%;
  margin-bottom: 1.25rem;
  &:hover {
    background-color: #dddddd;
  }
`;

const Vocab = () => {
  const { id } = useParams();

  const [vocabList, setVocabList] = useState(vocabList_);

  return (
    <div>
      <div className="py-5">
        <h1 className="fw-bold">My vocaburaly sets</h1>
      </div>
      {id}
      <StyledDiv>
        <PlusLg />
      </StyledDiv>
    </div>
  );
};

export default Vocab;
