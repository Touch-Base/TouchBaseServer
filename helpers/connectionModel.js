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