import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import WarningModal from "./WarningModal";

const StyledDiv = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  box-shadow: 0px 0px 2px #cccccc;
  background-color: ${(props) => (props.active ? props.bg : "#bbbbbb")};
  border-radius: 10px;
  &:hover {
    box-shadow: 0px 0px 4px #aaaaaa;
    opacity: 0.9;
  }
`;

const TrainCard = ({
  title,
  bgColor,
  vocaburalyCount,
  vocaburalyMin,
  redirectTo,
}) => {
  const history = useHistory();
  const [showWarningModal, setShowWarningModal] = useState(false);

  const handleClick = () => {
    if (vocaburalyCount >= vocaburalyMin) {
      history.push(redirectTo);
    } else {
      setShowWarningModal(true);
    }
  };

  return (
    <React.Fragment>
      <StyledDiv
        bg={bgColor}
        onClick={handleClick}
        active={vocaburalyCount >= vocaburalyMin}
      >
        {title}
      </StyledDiv>
      <WarningModal
        show={showWarningModal}
        title="Trainig Unavailable"
        body={`This training requires a word set to have at least ${vocaburalyMin} words`}
        handleOk={() => setShowWarningModal(false)}
      />
    </React.Fragment>
  );
};

export default TrainCard;
