const express = require('express')
const DBconn = require('../middleware/DBconnection');
const router = express.Router();

router.get('/', async (req, res) => {
    const query = 'MATCH (n: Person) RETURN n';
    const result = await DBconn.executeQuery(query);
    console.log(result.records.map(el => {
        return {
            _id: el._fields[0].identity,
            _labels: el._fields[0].labels,
            ...el._fields[0].properties
        }
    }))
    res.send('Person');
 });

 module.exports = router;