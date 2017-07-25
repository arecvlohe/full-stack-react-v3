const envVars = require("dotenv").config;
const MongoClient = require("mongodb").MongoClient;

// Pull in environment variables
envVars();

const URI = `mongodb://${process.env.USER}:${process.env
  .PASSWORD}@ds151008.mlab.com:51008/full-stack-react-v3`;

module.exports = function(cb) {
  return MongoClient.connect(URI, cb);
};
