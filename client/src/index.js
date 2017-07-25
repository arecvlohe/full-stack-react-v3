import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";
import configureStore from "./store";
const root = document.getElementById("root");
const store = configureStore();

function build(Component) {
  return render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root
  );
}

build(App);

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const App = require("./components/App").default;
    build(App);
  });
}
