const express = require("express");
const { upperCase, addAHundred } = require("./functions");

const app = express();
app.use(express.json());

const authKey = process.env.AUTH_KEY;

app.post("/upper-case", (req, res) => {
  if (!req.headers.authorization) {
    console.error("No auth header was provided");
    res.sendStatus(401).send("Unauthorized");
    return;
  }
  if (req.headers.authorization !== `Bearer ${authKey}`) {
    console.error("Wrong auth key");
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
  if (!req.headers.authorization) {
    console.error("No auth header was provided");
    res.sendStatus(401);
    return;
  }
  if (req.headers.authorization !== `Bearer ${authKey}`) {
    console.error("Wrong auth key");
    res.sendStatus(401);
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
