const express = require("express");
const path = require("path");

const neo4j = require("./routes/neo4j");
const mongo = require("./routes/mongo");

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use("/api/neo4j", neo4j);
app.use("/api/mongo", mongo);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/password", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/password.html"));
});

app.get("/neo4j", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/neo4j.html"));
});

app.get("/mongo", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/mongo.html"));
});

app.listen(process.env.PORT || 3000);
console.info("DDM server running");
