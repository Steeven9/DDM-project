const express = require("express");

const neo4j = require("./routes/neo4j");
const mongo = require("./routes/mongo");

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use("/api/neo4j", neo4j);
app.use("/api/mongo", mongo);

app.listen(process.env.PORT || 3000);
console.info("DDM server running");
