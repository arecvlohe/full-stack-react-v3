import React from "react";
import { connect } from "react-redux";
import { componentFromProp } from "recompose";
import { Switch, Route } from "react-router-dom";

import Detail from "./Detail";
import List from "./List";
import Urls from "../urls";

export default function App() {
  return (
    <main>
      <Switch>
        <Route exact path={Urls.Home} component={List} />
        <Route path={Urls.Todo} component={Detail} />
      </Switch>
    </main>
  );
}
