import styled from "styled-components";

import WordSet from "../components/WordSet";

const StyledDiv = styled.div`
  padding: 5rem;
`;

const Title = styled.span`
  font-size: 2rem;
`;

const Library = () => (
  <div>
    <div className="py-5">
      <h1 className="fw-bold">My vocaburaly sets</h1>
    </div>
    <WordSet />
  </div>
);

export default Library;
