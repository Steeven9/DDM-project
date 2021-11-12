const express = require("express");
const { Node, Path, Relationship } = require("neo4j-driver-core");
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
    const parseProperties = (p) => {
        const properties = {};
        Object.keys(p).forEach(key => {
            const value = p[key];
            if (key === 'date') {
                properties[key] =
                    `${value['year']}-${value['month']}-${value['day']}`;
            } else if (key === 'datetime') {
                properties[key] =
                    `${value['year']}-${value['month']}-${value['day']} ` +
                    `${value['hour']}:${value['minute']}`;
            } else {
                properties[key] = value;
            }
        });
        return properties;
    }
    const parseNode = (node) => {
        return {
            id: node.identity,
            labels: node.labels,
            properties: parseProperties(node.properties),
        };
    };
    const parseRelationShip = (relationship) => {
        return {
            id: relationship.identity,
            source: relationship.start,
            target: relationship.end,
            type: relationship.type,
            properties: parseProperties(relationship.properties),
        };
    };

    try {
        const result = await DBconn.executeQuery(req.query.query);
        // https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6281147/
        // https://jcsm.aasm.org/doi/10.5664/jcsm.9476
        // https://www.sleep.theclinics.com/article/S1556-407X(16)30106-0/fulltext
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const nodes = [];
        const edges = [];
        result.records.forEach(el => Object.keys(el._fieldLookup)
            .forEach(name => {
                const it = el._fields[el._fieldLookup[name]];
                if (it instanceof Path) {
                    it.segments.forEach(segment => {
                        const start = parseNode(segment.start);
                        const end = parseNode(segment.end);
                        const edge = parseRelationShip(segment.relationship);
                        if (!nodes.find(x => x.id === start.id)) {
                            nodes.push(start);
                        }
                        if (!nodes.find(x => x.id === end.id)) {
                            nodes.push(end);
                        }
                        if (!edges.find(x => x.id === edge.id)) {
                            edges.push(edge);
                        }
                    });
                } else if (it instanceof Node) {
                    const node = parseNode(it);
                    if (!nodes.find(x => x.id === node.id)) {
                        nodes.push(node);
                    }
                } else if (it instanceof Relationship) {
                    const edge = parseRelationShip(it);
                    if (!edges.find(x => x.id === edge.id)) {
                        edges.push(edge);
                    }
                } else {
                    console.error(`Unknown type: ${it}`);
                }
            }));

            res.send({nodes, edges});
    } catch (error) {
        console.error(error);
        res.send({nodes: [], edges: []});
    }
});

 module.exports = router;
