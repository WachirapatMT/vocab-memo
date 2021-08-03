import { Navbar, Container, Nav } from "react-bootstrap";

import { ROUTES } from "../constants";

const NavigationBar = () => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href={ROUTES.HOME}>Vocab Memo</Navbar.Brand>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href={ROUTES.LIBRARY}>My Library</Nav.Link>
        </Nav>
        <Nav>
          <Navbar.Text>Username</Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavigationBar;
