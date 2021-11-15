const neo4j = require("neo4j-driver");

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
  console.info("Connection to database successful");
} catch (e) {
  console.error(
    "Failed to connect to the database! Check that you set the correct env variables (see README for details)"
  );
}

async function executeQuery(statement, params = {}) {
  try {
    return session.run(statement, params);
  } catch (error) {
    // Throw up
    console.error(error);
    throw error;
  }
}
module.exports = { executeQuery };
