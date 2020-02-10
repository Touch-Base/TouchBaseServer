const db = require('../data/db-config');  // imports database


// functions for dealing with CRUD for connections

module.exports = {
  // Create
  addConnection,
  
  // Read
  getConnections,
  getAllConnections,
  getConnectionsByUser,
  
  // Update
  updateConnectionById,
  
  // Delete
  deleteConnection
}

// ---- CREATE ----




// ---- READ ----

// getAllConnections() - returns all results for connections

async function getAllConnections() {
  const results = await db  
    .from('connections')
    .select('*')

  return results;
}
