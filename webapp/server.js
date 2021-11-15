const express = require("express");
const path = require("path");

const person = require("./routes/person");
const mongo = require("./routes/mongo");

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use("/person", person);
app.use("/mongo", mongo);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/password", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/password.html"));
});

app.listen(process.env.PORT || 3000);
console.info("DDM server running");
