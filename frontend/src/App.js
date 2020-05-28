import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import "./App.css";
import { history } from "./history";
import HomePage from "./HomePage";
import EditPage from "./EditPage";

function App() {
  return (
    <Router history={history}>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/edit" component={EditPage} />
    </Router>
  );
}

export default App;
