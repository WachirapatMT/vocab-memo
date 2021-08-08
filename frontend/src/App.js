import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { CookiesProvider } from "react-cookie";

import { ROUTES } from "./constants";
import { Home, Library, Vocaburaly, FlashCard, Quiz } from "./views";
import NavigationBar from "./components/NavigationBar";

const App = () => (
  <CookiesProvider>
    <Router>
      <NavigationBar />
      <Container>
        <Switch>
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.LIBRARY} component={Library} />
          <Route exact path={ROUTES.VOCABURALY} component={Vocaburaly} />
          <Route path={ROUTES.FLASH_CARD} component={FlashCard} />
          <Route path={ROUTES.QUIZ} component={Quiz} />
        </Switch>
      </Container>
    </Router>
  </CookiesProvider>
);

export default App;
