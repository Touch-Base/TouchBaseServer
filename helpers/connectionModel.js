const db = require('../data/db-config');  // imports database


// functions for dealing with CRUD for connections

module.exports = {
  // Create
  addConnection,
  
  // Read
  getConnection,
  getAllConnections,
//   getConnectionsByUser,
  
  // Update
//   updateConnectionById,
  
  // Delete
//   deleteConnection
}

// ---- CREATE ----
 
// addConnection(connection, userId) - adds a connection to a specific user

// ---- CREATE ----

// addConnection(input) - inserts input to connections and returns results by userId

async function addConnection(input, userId) {
  const results = await db
    .from('connections')
    .returning('id')
    .insert({ ...input, userId: userId })
   
   return getConnection(results[0])
 }
 
// ---- READ ----

// getConnection() - returns results for a connection by id

async function getConnection(id) {
  const [connection] = await db
    .from('connections')
    .select('*')
    .where({ id })
  
  return job || null;
}

// getAllConnections() - returns all results for connections

async function getAllConnections() {
  const results = await db  
    .from('connections')
    .select('*')

  return results;
}
