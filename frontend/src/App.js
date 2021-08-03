import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import { ROUTES } from "./constants";
import { PrivateSet } from "./views";

function App() {
  return (
    <Router>
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
      <Switch>
        <Route path={ROUTES.PRIVATE_SET} component={PrivateSet} />
      </Switch>
    </Router>
  );
}

export default App;
