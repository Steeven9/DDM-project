const express = require("express");
const router = express.Router();
const { ourMongo } = require("../middleware/DBconnection");

// see https://docs.mongodb.com/drivers/node/current/usage-examples/

// eslint-disable-next-line no-unused-vars
const assertPassword = (req) =>
  new Promise((resolve, reject) => {
    const auth = req.headers.authorization;
    if (auth === `Bearer ${process.env.HTTP_PASSWORD}`) {
      resolve();
    } else {
      reject("Wrong or missing password");
    }
  });

/**
 * Gets all documents in the DB.
 * Returns an array of documents or 404 if none.
 */
router.get("/all", async (req, res) => {
  let docs = [];
  let db = await ourMongo();
  let result = await db.find({});
  await result.forEach(docs.push);
  if (docs.length > 0) {
    res.send(result);
  } else {
    res.status(404).send("No documents in the database");
  }
});

/**
 * Takes a `query` object and returns all documents that
 * match that filter.
 * Returns an array of documents or 404 if none.
 */
router.get("/", async (req, res) => {
  let docs = [];
  let db = await ourMongo();
  let result = await db.find(req.body.query);
  await result.forEach(docs.push);
  if (docs.length > 0) {
    res.send(result);
  } else {
    res.status(404).send("No documents found");
  }
});

/**
 * Takes a `documents` object and inserts them in the DB.
 * Returns 201 on success or 500 on failure.
 */
router.post("/insert", async (req, res) => {
  let db = await ourMongo();
  let result = await db.insertMany(req.body.documents);
  if (Number(result.result.ok)) {
    res.status(201).send(result.insertedCount + " docs inserted successfully");
  } else {
    console.error("Error inserting docs ", result);
    res.status(500).send("Error inserting docs ", result);
  }
});

/**
 * Takes a `filter` and a `newValues` objects, updates all documents
 * that match the filter.
 * Returns 201 on success or 500 on failure.
 */
router.post("/update", async (req, res) => {
  let db = await ourMongo();
  let result = await db.updateMany(req.body.filter, req.body.newValues);
  if (Number(result.result.ok)) {
    res.status(201).send(result.nModified + " docs updated successfully");
  } else {
    console.error("Error updating docs ", result);
    res.status(500).send("Error updating docs ", result);
  }
});

module.exports = router;
