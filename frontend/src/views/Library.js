import { useState } from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { PlusLg } from "react-bootstrap-icons";
import useSWR from "swr";
import axios from "axios";

import { config } from "../config";
import WordSet from "../components/WordSet";
import WordSetFormModal from "../components/WordSetFormModal";
import { FORM_MODE } from "../constants";

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
  const [token] = useCookies([config.cookieName]);
  const [showCreateFormModal, setShowCreateFormModal] = useState(false);

  const { data: wordSetList, mutate } = useSWR(
    `${config.apiHost}/word-set`,
    async (url) => {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token[config.cookieName] || ""}`,
        },
      });
      return res?.data ?? [];
    },
  );

  const addWordSet = async (title, description) => {
    mutate([...wordSetList, { title, description, vocaburaly: [] }]);
    await axios.post(
      `${config.apiHost}/word-set`,
      { title, description },
      {
        headers: {
          Authorization: `Bearer ${token[config.cookieName] || ""}`,
        },
      },
    );
    mutate();
  };

  const editWordSet = async (id, title, description) => {
    mutate([
      ...wordSetList.filter((wordSet) => wordSet._id !== id),
      {
        ...wordSetList.find((wordSet) => wordSet._id === id),
        title,
        description,
      },
    ]);
    await axios.patch(
      `${config.apiHost}/word-set/${id}`,
      {
        title,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token[config.cookieName] || ""}`,
        },
      },
    );
    mutate();
  };

  const deleteWordSet = async (id) => {
    mutate(wordSetList.filter((wordSet) => wordSet._id !== id));
    await axios.delete(`${config.apiHost}/word-set/${id}`, {
      headers: {
        Authorization: `Bearer ${token[config.cookieName] || ""}`,
      },
    });
    mutate();
  };

  return (
    <div>
      <div className="py-5">
        <h1 className="fw-bold">My vocaburaly sets</h1>
      </div>
      {wordSetList?.map(({ _id, title, description, vocaburaly }) => (
        <WordSet
          key={_id}
          id={_id}
          title={title}
          description={description}
          wordCount={vocaburaly.length}
          editWordSet={editWordSet}
          deleteWordSet={deleteWordSet}
        />
      ))}
      <StyledDiv onClick={() => setShowCreateFormModal(true)}>
        <PlusLg />
      </StyledDiv>
      <WordSetFormModal
        mode={FORM_MODE.CREATE}
        show={showCreateFormModal}
        handleSubmit={addWordSet}
        handleClose={() => setShowCreateFormModal(false)}
      />
    </div>
  );
};

export default Library;
