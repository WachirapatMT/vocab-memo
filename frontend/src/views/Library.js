import { useState } from "react";
import styled from "styled-components";
import { PlusLg } from "react-bootstrap-icons";
import useSWR from "swr";
import axios from "axios";

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
  const [showCreateFormModal, setShowCreateFormModal] = useState(false);
  const [showEditFormModal, setShowEditFormModal] = useState(false);

  const [editWordSetId, setEditWordSetId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const { data: wordSetList, mutate } = useSWR(
    "http://localhost:3001/word-set",
    async (url) => {
      const res = await axios.get(url);
      return res?.data ?? [];
    },
  );

  const addWordSet = async ({ title, description }) => {
    mutate([...wordSetList, { title, description, vocaburaly: [] }]);
    await axios.post("http://localhost:3001/word-set", { title, description });
    mutate();
  };

  const editWordSet = async ({ title, description }) => {
    mutate([
      ...wordSetList.filter((wordSet) => wordSet._id !== editWordSetId),
      {
        ...wordSetList.find((wordSet) => wordSet._id === editWordSetId),
        title,
        description,
      },
    ]);
    await axios.patch(`http://localhost:3001/word-set/${editWordSetId}`, {
      title,
      description,
    });
    mutate();
    // setEditWordSetId();
    // setEditTitle(title);
    // setEditDescription("");
  };

  const deleteWordSet = async (id) => {
    mutate(wordSetList.filter((wordSet) => wordSet._id !== id));
    await axios.delete(`http://localhost:3001/word-set/${id}`);
    mutate();
  };

  const handleEdit = ({ id, title, description }) => {
    setEditWordSetId(id);
    setEditTitle(title);
    setEditDescription(description);
    setShowEditFormModal(true);
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
          editWordSet={handleEdit}
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
      <WordSetFormModal
        mode={FORM_MODE.EDIT}
        show={showEditFormModal}
        title={editTitle}
        description={editDescription}
        handleSubmit={editWordSet}
        handleClose={() => setShowEditFormModal(false)}
      />
    </div>
  );
};

export default Library;
