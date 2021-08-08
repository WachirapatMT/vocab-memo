import React, { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: #202020;
  color: white;
  box-shadow: 0px 1px 15px #aaaaaa;
  margin-top: 8rem;
  width: 50vw;
  max-width: 400px;
  min-width: 300px;
  padding: 1rem 2.5rem;
`;

const StyledSpan = styled.span`
  color: ${(props) => (props.active ? "white" : "#aaaaaa")};
  &:hover {
    color: white;
  }
`;

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  const handleLogin = () => {};

  const handleSignUp = () => {};

  return (
    <div className="d-flex justify-content-center">
      <StyledDiv>
        <Row className="d-flex justify-content-center my-4 h2">
          <div className="d-flex justify-content-center">
            <StyledSpan active={isLogin} onClick={() => setIsLogin(true)}>
              Login
            </StyledSpan>
            <span className="mx-3 text-white-50">|</span>
            <StyledSpan active={!isLogin} onClick={() => setIsLogin(false)}>
              SignUp
            </StyledSpan>
          </div>
        </Row>
        <Row>
          <Form
            id="create-word-set-form"
            onSubmit={handleFormSubmit}
          >
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-center my-4">
              <Button variant="primary" type="submit">
                {isLogin ? "Log in" : "Sign up"}
              </Button>
            </div>
          </Form>
        </Row>
      </StyledDiv>
    </div>
  );
};

export default Home;