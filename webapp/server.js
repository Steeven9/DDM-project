const express = require("express");
const neo4j = require("neo4j-driver");
const path = require("path");

const env = process.env.NODE_ENV || "development";
const person = require("./routes/person");

const app = express();

app.use(express.json())
app.use(express.static(__dirname + '/public'));

app.use("/person", person);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/password", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/password.html"));
});


app.listen(process.env.PORT || 3000);
console.log("DDM server running")
