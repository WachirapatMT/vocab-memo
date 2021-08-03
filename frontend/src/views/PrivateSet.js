import styled from "styled-components";

import WordSet from "../components/WordSet";

const StyledDiv = styled.div`
  padding: 5rem;
`;

const Title = styled.span`
  font-size: 2rem;
`;

const PrivateSet = () => (
  <StyledDiv>
    <p class="font-weight-bold">My vocaburaly sets</p>
    <p class="font-weight-bold">Bold text.</p>
    <WordSet />
  </StyledDiv>
);

export default PrivateSet;
