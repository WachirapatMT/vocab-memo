import React, { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import axios from "axios";

import { config } from "../config";
import { ROUTES, REDIRECT_CONDITION } from "../constants";
import useUser from "../utils/useUser";
import WarningModal from "../components/WarningModal";

const StyledDiv = styled.div`
  background-color: #202020;
  color: white;
  box-shadow: 0px 1px 15px #aaaaaa;
  margin-top: 6rem;
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
  const { mutateUser } = useUser({
    redirectTo: ROUTES.LIBRARY,
    redirectWhen: REDIRECT_CONDITION.USER_FOUND,
  });

  const [token, setCookie, removeCookie] = useCookies([config.cookieName]);

  const [validated, setValidated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showWarningModal, setShowWarningModal] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(`${config.apiHost}/user/login`, {
        username,
        password,
      });
      if (data?.token) {
        setCookie(config.cookieName, data.token, {
          path: "/",
          maxAge: config.cookieMaxAge,
        });
      }
      mutateUser();
    } catch (err) {
      setShowWarningModal(true);
      removeCookie(config.cookieName, { path: "/" });
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  const handleSignUp = async () => {
    setValidated(true);
    if (password.length < 8 || confirmPassword !== password) {
      return;
    }
    try {
      const { data } = await axios.post(`${config.apiHost}/user`, {
        username,
        password,
      });
      if (data?.token) {
        setCookie(config.cookieName, data.token, {
          path: "/",
          maxAge: config.cookieMaxAge,
        });
      }
      mutateUser();
    } catch (err) {
      setShowWarningModal(true);
      removeCookie(config.cookieName, { path: "/" });
    } finally {
      setValidated(false);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <React.Fragment>
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
            <Form id="create-word-set-form" onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter password"
                  isInvalid={validated && password.length < 8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Password must contain at least 8 characters
                </Form.Control.Feedback>
              </Form.Group>
              {!isLogin && (
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold"> Confirm password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Confirm password"
                    isInvalid={validated && password !== confirmPassword}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Confirm password doesn't match the password
                  </Form.Control.Feedback>
                </Form.Group>
              )}
              <div className="d-flex justify-content-center my-4">
                <Button variant="primary" type="submit">
                  {isLogin ? "Log in" : "Sign up"}
                </Button>
              </div>
            </Form>
          </Row>
        </StyledDiv>
      </div>
      <WarningModal
        show={showWarningModal}
        title={isLogin ? "Login failed" : "Sign up failed"}
        body={
          isLogin
            ? "Email/Password is incorrect"
            : "This username has already been used"
        }
        handleOk={() => setShowWarningModal(false)}
      />
    </React.Fragment>
  );
};

export default Home;
