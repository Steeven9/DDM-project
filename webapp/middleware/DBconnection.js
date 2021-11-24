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
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1";
const client = new MongoClient(mongoURI);
let db;
async function ourMongo() {
  // https://www.youtube.com/watch?v=xirKvZv9Hq8
  if (db) {
    return db;
  }
  try {
    await client.connect();
    const database = client.db("ddm-project");
    db = database.collection("certificates");
    return db;
  } catch (err) {
    console.error(
      "Failed to connect to the mongoDB database! Check that you set the correct env variables (see README for details)"
    );
    console.error(err);
  }
}

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

module.exports = { executeQuery, ourMongo };
