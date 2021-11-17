const neo4j = require("neo4j-driver");
const MongoClient = require("mongodb").MongoClient;

// neo4j connection
let driver, session;
try {
  driver = neo4j.driver(
    process.env.NEO4J_URL,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD),
    {
      maxConnectionLifetime: 3 * 60 * 60 * 1000, // 3 hours
      maxConnectionPoolSize: 50,
      connectionAcquisitionTimeout: 2 * 60 * 1000, // 120 seconds
      disableLosslessIntegers: true,
    }
  );
  session = driver.session();
  console.info("Connection to neo4j database successful");
} catch (e) {
  console.error(
    "Failed to connect to the neo4j database! Check that you set the correct env variables (see README for details)"
  );
}

//mongoDB connection
const mongoURI = process.env.MONGODB_URI || "mongodb://mongo/ddm-project";
let db;
MongoClient.connect(mongoURI, function (err, client) {
  if (err) {
    console.error(
      "Failed to connect to the mongoDB database! Check that you set the correct env variables (see README for details)"
    );
    console.error(err);
    return;
  }
  console.info("Connection to mongoDB database successful");
  db = client.db("ddm-project");
});

//query execution (neo4j)
async function executeQuery(statement, params = {}) {
  try {
    return session.run(statement, params);
  } catch (error) {
    // Throw up
    console.error(error);
    throw error;
  }
}

//query execution (mongoDB)
async function executeMongoQuery(query) {
  try {
    return db.collection("certificates").find(query);
  } catch (error) {
    // Throw up
    console.error(error);
    throw error;
  }
}
module.exports = { executeQuery, executeMongoQuery };
