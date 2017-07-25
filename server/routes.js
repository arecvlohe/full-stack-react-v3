const express = require("express");
const { ObjectId } = require("mongodb");
const routes = require("debug")("app:routes");
const error = require("debug")("app:error");
const log = require("debug")("app:log");

const api = express.Router();

module.exports = function(app, db) {
  // ERROR HANDLING MIDDLEWARE
  api.use((err, req, res, next) => {
    error(err.stack);
    res.status(500).send("There was an error");
    next();
  });
  // LOG REQUEST
  api.use((req, res, next) => {
    routes(`${req.method} from ${req.originalUrl}`);
    next();
  });

  // GET ALL TODOS
  api.get("/", (req, res) => {
    db.collection("todos").find({}).toArray((err, todos) => {
      if (err) {
        error(err.stack);
        res.error(err);
      } else {
        log("GOT ALL TODOS");
        res.json({ todos });
      }
    });
  });
  // GET SINGLE TODO
  api.get("/:id", (req, res) => {
    db
      .collection("todos")
      .findOne({ _id: ObjectId(req.params.id) })
      .then(todo => {
        log(`GOT TODO ${req.params.id}`);
        res.json({ todo });
      })
      .catch(err => {
        error(err.stack);
        res.error(err);
      });
  });
  // CREATE SINGLE TODO
  api.post("/", (req, res) => {
    const { body: { title, completed } } = req;
    db
      .collection("todos")
      .insertOne({ title: title, completed: completed })
      .then(todo => {
        log("ADDED TODO");
        res.json({ todo });
      })
      .catch(err => {
        error(err);
        res.error(err);
      });
  });
  // UPDATE SINGLE TODO
  api.put("/:id", (req, res) => {
    const { params: { id }, body: { title, completed } } = req;
    db
      .collection("todos")
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { title: title, completed: completed } },
        { returnOriginal: false }
      )
      .then(todo => {
        log(`UPDATED TODO ${req.params.id}`);
        res.status(200);
      })
      .catch(err => {
        error(err);
        res.error(err);
      });
  });
  // DELETE SINGLE TODO
  api.delete("/:id", (req, res) => {
    const { params: { id } } = req;
    db
      .collection("todos")
      .findOneAndDelete({ _id: ObjectId(id) })
      .then(todo => {
        log(`DELETED TODO ${req.params.id}`);
        res.stats(200);
      })
      .catch(err => {
        error(err);
        res.error(err);
      });
  });

  app.use("/todos", api);

  return app;
};
