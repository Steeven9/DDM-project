const neo4j = require('neo4j-driver');
const config = require('../config/config')['development'];

const driver = neo4j.driver(config.neo4j, neo4j.auth.basic(config.username, config.password), {
  maxConnectionLifetime: 3 * 60 * 60 * 1000, // 3 hours
  maxConnectionPoolSize: 50,
  connectionAcquisitionTimeout: 2 * 60 * 1000, // 120 seconds
  disableLosslessIntegers: true
});

const session = driver.session();

async function executeQuery(statement, params = {}) {
  try {
    const result = session.run(statement, params);
    //session.close();
    return result;
  } catch (error) {
    throw error;
  }
}
module.exports = { executeQuery };