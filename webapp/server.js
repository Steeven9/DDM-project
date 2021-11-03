const express = require("express");
const neo4j = require("neo4j-driver");
const path = require("path");

const env = process.env.NODE_ENV || "development";
const person = require("./routes/person");

const app = express();

app.use(express.json())

app.use("/person", person);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(process.env.PORT || 3000);
console.log("DDM server running")
