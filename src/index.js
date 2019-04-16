/* eslint-disable no-console */
const express = require("express");
const Sequelize = require("sequelize");
const { upperCase, addAHundred } = require("./functions");
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

//

const app = express();
app.use(express.json());

const sequelize = new Sequelize(
  `mariadb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
);

const authKey = process.env.AUTH_KEY;

const checkHeaders = req => {
  if (!req.headers.authorization) {
    console.error("No auth header was provided");
    return false;
  }
  if (req.headers.authorization !== `Bearer ${authKey}`) {
    console.error("Wrong auth key");
    return false;
  }
  return true;
};

app.post("/", (req, res) => {
  if (!checkHeaders(req)) {
    res.sendStatus(401).send("Unauthorized");
    return;
  }
  sequelize
    .query("SELECT message from message")
    .then(([results]) => {
      res.send(results.map(result => result));
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.post("/upper-case", (req, res) => {
  if (!checkHeaders(req)) {
    res.sendStatus(401).send("Unauthorized");
    return;
  }
  if (!req.body) {
    console.error("No body was provided");
    res.sendStatus(400);
    return;
  }
  res.send({ value: upperCase(req.body.value) });
});

app.post("/add-a-hundred", (req, res) => {
  if (!checkHeaders(req)) {
    res.sendStatus(401).send("Unauthorized");
    return;
  }
  if (!req.body) {
    console.error("No body was provided");
    res.sendStatus(400);
    return;
  }
  res.send({ value: addAHundred(req.body.value) });
});

app.listen(3000, () => console.log("Serveur started on port 3000"));
