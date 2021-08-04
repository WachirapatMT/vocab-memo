import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import { ROUTES } from "./constants";
import { Library, Vocaburaly } from "./views";
import NavigationBar from "./components/NavigationBar";

const Home = () => <div>Home</div>;

const App = () => (
  <React.Fragment>
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
  </React.Fragment>
);

export default App;
