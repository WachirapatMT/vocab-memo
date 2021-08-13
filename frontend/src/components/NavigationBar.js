import { Power } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useCookies } from "react-cookie";
import styled from "styled-components";

import { config } from "../config";
import { ROUTES, REDIRECT_CONDITION } from "../constants";
import useUser from "../utils/useUser";

const StyledIcon = styled.div`
  margin-left: 1rem;
  width: 30px;
  height: 30px;
  padding: 6px 0px;
  border-radius: 15px;
  font-size: 1.2rem;
  // text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #aaaaaa;
  color: #222222;
  padding-top: 5px;
  &:hover {
    background-color: #dddddd;
    color: red;
  }
`;

const NavigationBar = () => {
  const { user } = useUser({
    redirectTo: ROUTES.HOME,
    redirectWhen: REDIRECT_CONDITION.USER_NOT_FOUND,
  });
  const history = useHistory();
  const [token, setCookie, removeCookie] = useCookies([
    process.env.COOKIE_NAME,
  ]);

  const handleLogout = () => {
    removeCookie(config.cookieName, { path: "/" });
    history.push(ROUTES.HOME);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href={ROUTES.HOME}>Vocab Memo</Navbar.Brand>
        {user && (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href={ROUTES.LIBRARY}>My Library</Nav.Link>
            </Nav>

            <Nav>
              <Navbar.Text>{user.username}</Navbar.Text>
            </Nav>
            <Nav>
              <StyledIcon onClick={handleLogout}>
                <Power />
              </StyledIcon>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
