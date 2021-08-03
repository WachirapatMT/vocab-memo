import { Navbar, Container, Nav } from "react-bootstrap";

const NavigationBar = () => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">Vocab Memo</Navbar.Brand>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/private-set">My vocaburaly sets</Nav.Link>
        </Nav>
        <Nav>
          <Navbar.Text>Username</Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavigationBar;
