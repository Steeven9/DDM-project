const express = require("express");
const router = express.Router();
const { ourMongo } = require("../middleware/DBconnection");
const ObjectID = require("mongodb").ObjectID;

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
      return res.send({});
    }
    await cursor.forEach((el) => docs.push(el));
    res.send(docs);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.toString() });
  }
});

/**
 * Takes a `documents` object and inserts them in the DB.
 * Returns 201 on success or 500 on failure.
 */
router.post("/insert/:collection", async (req, res) => {
  try {
    let docs = JSON.parse(req.query.docs);
    await assertPassword(req);
    let db = await ourMongo(req.params.collection);
    let result = await db.insertMany(docs);
    if (result.insertedCount > 0) {
      res
        .status(201)
        .send({ msg: result.insertedCount + " doc(s) inserted successfully" });
    } else {
      console.error("Error inserting docs ", result);
      res.status(500).send({ error: "Error inserting docs " + result });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.toString() });
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
    let result = await db.updateMany(req.query.filter, req.query.newValues);
    if (Number(result.result.ok)) {
      res
        .status(201)
        .send({ msg: result.nModified + " doc(s) updated successfully" });
    } else {
      console.error("Error updating docs ", result);
      res.status(500).send({ error: "Error inserting docs " + result });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.toString() });
  }
});

router.get("/check/:collection/:id", async (req, res) => {
  try {
    await assertPassword(req);
    const db = await ourMongo(req.params.collection);
    const cursor = db.find({ _id: new ObjectID(req.params.id) });
    switch (await cursor.count()) {
      case 0:
        return res.error(404).send({
          error: "Certificate not found",
          valid: false,
        });
      case 1:
        return res.status(201).send({ valid: true });
      default:
        return res.error(400).send({
          error: "More than one certificate match the given id",
          valid: false,
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.toString() });
  }
});

module.exports = router;
