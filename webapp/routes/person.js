const express = require("express");
const DBconn = require("../middleware/DBconnection");
const router = express.Router();

router.get("/all", async (req, res) => {
    const query = "MATCH (n: Person) RETURN n";
    const result = await DBconn.executeQuery(query);
    res.send(result.records.map(el => {
        return {
            _id: el._fields[0].identity,
            _labels: el._fields[0].labels,
            ...el._fields[0].properties
        }
    }));
});

router.get("/", async (req, res) => {
    const result = await DBconn.executeQuery(req.query.query);
    res.send(result.records.map(el => {
        return {
            _id: el._fields[0].identity,
            _labels: el._fields[0].labels,
            ...el._fields[0].properties
        }
    }));
});

 module.exports = router;
