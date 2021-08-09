import { useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  height: 400px;
  width: 90%;
  perspective: 1000px;
  margin: 5px;
`;

const StyledInnerFlipCard = styled.div`
  // position: relative;
  width: 100%;
  height: 100%;
  max-width: 600px;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${(props) => props.isFlip && `rotateX(180deg)`};
`;

const StyledFrontFlipCard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  box-shadow: 0.5px 0.5px 5px #bbbbbb;
  color: black;
`;

const StyledBackFlipCard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  box-shadow: 0.5px 0.5px 5px #bbbbbb;
  color: black;
  transform: rotateX(180deg);
`;

const StyledCardSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${(props) => props.height};
  font-size: ${(props) => props.fs};
  font-weight: ${(props) => props.fw};
  ${(props) =>
    props.dark &&
    `background-color: black;
  color: white;`}
`;

const FlipCard = ({ word, definition }) => {
  const [isFlip, setIsFlip] = useState(false);

  return (
    <StyledDiv>
      <StyledInnerFlipCard onClick={() => setIsFlip(!isFlip)} isFlip={isFlip}>
        <StyledFrontFlipCard>
          <StyledCardSection height="85%" fw="bold" fs="2rem">
            {word}
          </StyledCardSection>
          <StyledCardSection height="15%" dark>
            Click to see the definition
          </StyledCardSection>
        </StyledFrontFlipCard>
        <StyledBackFlipCard>
          <StyledCardSection height="85%" fw="bold" fs="2rem">
            {definition}
          </StyledCardSection>
          <StyledCardSection height="15%" dark>
            Click to see the word
          </StyledCardSection>
        </StyledBackFlipCard>
      </StyledInnerFlipCard>
    </StyledDiv>
  );
};

export default FlipCard;
