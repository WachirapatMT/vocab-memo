import { Navbar, Container, Nav } from "react-bootstrap";

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Vocab Memo</Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>Public sets</Nav.Link>
              <Nav.Link>Private sets</Nav.Link>
            </Nav>
            <Nav>
              <Navbar.Text>Username</Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default App;
