const express = require("express");
const router = express.Router();
const { ourMongo } = require("../middleware/DBconnection");

// see https://docs.mongodb.com/drivers/node/current/usage-examples/

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
 * Takes a `query` object and returns all documents that
 * match that filter.
 * Returns an array of documents or 404 if none.
 */
router.get("/:collection", async (req, res) => {
  try {
    let query = JSON.parse(req.query.query || "{}");
    await assertPassword(req);
    let docs = [];
    let db = await ourMongo(req.params.collection);
    let cursor = db.find(query);
    if ((await cursor.count()) === 0) {
      return res.status(404).send({});
    }
    await cursor.forEach((el) => docs.push(el));
    res.send(docs);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

/**
 * Takes a `documents` object and inserts them in the DB.
 * Returns 201 on success or 500 on failure.
 */
router.post("/insert/:collection", async (req, res) => {
  try {
    await assertPassword(req);
    let db = await ourMongo(req.params.collection);
    let result = await db.insertMany(req.body);
    if (result.insertedCount > 0) {
      res
        .status(201)
        .send(result.insertedCount + " doc(s) inserted successfully");
    } else {
      console.error("Error inserting docs ", result);
      res.status(500).send("Error inserting docs ", result);
    }
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

/**
 * Takes a `filter` and a `newValues` objects, updates all documents
 * that match the filter.
 * Returns 201 on success or 500 on failure.
 */
router.post("/update/:collection", async (req, res) => {
  try {
    await assertPassword(req);
    let db = await ourMongo(req.params.collection);
    let result = await db.updateMany(req.body.filter, req.body.newValues);
    if (Number(result.result.ok)) {
      res.status(201).send(result.nModified + " doc(s) updated successfully");
    } else {
      console.error("Error updating docs ", result);
      res.status(500).send("Error updating docs ", result);
    }
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

module.exports = router;
