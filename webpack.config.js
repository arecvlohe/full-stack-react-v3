const path = require("path");
const webpack = require("webpack");

module.exports = {
  resolve: {
    alias: {
      Store: path.resolve(__dirname, "client/src/store")
    }
  },
  entry: [
    "react-hot-loader/patch",
    "webpack-hot-middleware/client",
    path.resolve(__dirname, "client/src")
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "client/dist"),
    publicPath: "/static/"
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
