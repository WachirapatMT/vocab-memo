import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { CookiesProvider } from "react-cookie";

import { ROUTES } from "./constants";
import { Home, Library, Vocaburaly } from "./views";
import NavigationBar from "./components/NavigationBar";

const App = () => (
  <CookiesProvider>
    <NavigationBar />
    <Container>
      <Router>
        <Switch>
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.LIBRARY} component={Library} />
          <Route path={ROUTES.VOCABURALY} component={Vocaburaly} />
        </Switch>
      </Router>
    </Container>
  </CookiesProvider>
);

export default App;
