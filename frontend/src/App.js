import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ROUTES } from "./constants";
import { PrivateSet } from "./views";
import NavigationBar from "./components/NavigationBar";
import Layout from "./containers/Layout";

const Home = () => <div>Home</div>;

const App = () => (
  <React.Fragment>
    <NavigationBar />
    <Layout>
      <Router>
        <Switch>
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.PRIVATE_SET} component={PrivateSet} />
        </Switch>
      </Router>
    </Layout>
  </React.Fragment>
);

export default App;
