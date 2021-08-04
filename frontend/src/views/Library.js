import { useState } from "react";
import styled from "styled-components";
import { PlusLg } from "react-bootstrap-icons";

import WordSet from "../components/WordSet";

const wordSetList_ = [
  { id: 1, title: "test1", description: "description1", wordCount: 1 },
  { id: 2, title: "test2", description: "description2", wordCount: 2 },
  { id: 3, title: "test3", description: "description3", wordCount: 3 },
];

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
  box-shadow: 0px 2px 7px #cccccc;
  height: 6rem;
  width: 100%;
  margin-bottom: 1.25rem;
  &:hover {
    background-color: #dddddd;
  }
`;

const Library = () => {
  const [wordSetList, setWordSetList] = useState(wordSetList_);

  return (
    <div>
      <div className="py-5">
        <h1 className="fw-bold">My vocaburaly sets</h1>
      </div>
      {wordSetList.map(({ id, title, description, wordCount }) => (
        <WordSet
          key={id}
          id={id}
          title={title}
          description={description}
          wordCount={wordCount}
        />
      ))}
      <StyledDiv>
        <PlusLg />
      </StyledDiv>
    </div>
  );
};

export default Library;
