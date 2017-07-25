const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("../webpack.config.js");

const info = require("debug")("app:info");
const error = require("debug")("app:error");
const wp = require("debug")("app:webpack");

const app = express();
const init = require("../db");
const routes = require("./routes");

const PORT = 3000;

const compiler = webpack(config);
app.use(
  webpackDevMiddleware(compiler, {
    contentBase: path.resolve(__dirname, "../client/dist"),
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: "minimal"
  })
);
app.use(
  webpackHotMiddleware(compiler, {
    heartbeat: 2000,
    log: wp,
    noInfo: false,
    path: "/__webpack_hmr",
    quiet: false,
    reload: false
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

init((err, db) => {
  if (err) {
    error("Failed to make db connection");
    error(err);
    process.exit(1);
  }

  routes(app, db);

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
  });

  app.listen(PORT, err => {
    if (err) {
      error(err);
    }
    info("Listening on port %d", PORT);
  });
});
