const express = require("express");
const DBconn = require("../middleware/DBconnection");
const router = express.Router();

router.get("/all", async (req, res) => {
    const query = "MATCH (n: Person) RETURN n";
    try {
        const result = await DBconn.executeQuery(query);
        res.send(result.records.map(el => {
            return {
                id: el._fields[0].identity,
                labels: el._fields[0].labels,
                properties: el._fields[0].properties
            }
        }));
    } catch (error) {
        console.error(error);
        res.send("DB error");
    }
});

router.get("/", async (req, res) => {
    try {
        const result = await DBconn.executeQuery(req.query.query);
        res.send(result.records.map(el => {
            return {
                id: el._fields[0].identity,
                labels: el._fields[0].labels,
                properties: el._fields[0].properties
            }
        }));
    } catch (error) {
        console.error(error);
        res.send("DB error");
    }
});

 module.exports = router;
