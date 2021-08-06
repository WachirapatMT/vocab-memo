import { useState } from "react";
import styled from "styled-components";
import { PlusLg } from "react-bootstrap-icons";
import useSWR from "swr";
import axios from "axios";

import WordSet from "../components/WordSet";
import WordSetFormModal from "../components/WordSetFormModal";

// const wordSetList_ = [
//   { id: 1, title: "test1", description: "description1", wordCount: 1 },
//   { id: 2, title: "test2", description: "description2", wordCount: 2 },
//   { id: 3, title: "test3", description: "description3", wordCount: 3 },
// ];

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
  const [show, setShow] = useState(false);

  const { data: wordSetList } = useSWR(
    "http://localhost:3001/word-set",
    (url) => axios.get(url),
  );

  // const addWordSet = (title, description) => {
  //   setWordSetList([
  //     ...wordSetList,
  //     { id: 4, title, description, wordCount: 0 },
  //   ]);
  // };

  return (
    <div>
      <div className="py-5">
        <h1 className="fw-bold">My vocaburaly sets</h1>
      </div>
      {wordSetList?.data?.map(({ _id, title, description, vocaburaly }) => (
        <WordSet
          key={_id}
          id={_id}
          title={title}
          description={description}
          wordCount={vocaburaly.length}
        />
      ))}
      <StyledDiv onClick={() => setShow(true)}>
        <PlusLg />
      </StyledDiv>
      <WordSetFormModal show={show} handleClose={() => setShow(false)} />
    </div>
  );
};

export default Library;
