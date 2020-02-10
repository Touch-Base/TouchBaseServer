const db = require('../data/db-config');  // imports database


// functions for dealing with CRUD for connections

module.exports = {
  // Create
  addConnection,
  
  // Read
  getConnection,
  getAllConnections,
  getConnectionsByUser,
  
  // Update
//   updateConnectionById,
  
  // Delete
//   deleteConnection
}


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
  
  return connection || null;
}

// getAllConnections() - returns all results for connections

async function getAllConnections() {
  const results = await db  
    .from('connections')
    .select('*')

  return results;
}

// getConnectionsByUser() - returns all connections for a user by id

async function getConnectionsByUser(userId) {
  const results = await db
    .from('connections')
    .where({ 'connections.userId': userId })
    .select('*')
  
  return results;
}

// ---- UPDATE ----
           
// updateConnectionById() - updates a connection by connection id
           
async function updateConnectionById(changes, id) {

    /// matches connection id and user id to correct connection

    const [connection] = await db
        .from('connections')
        .update(changes)
        .where({ 
          'id': changes.id,
          'userId': id  
          })
        .returning('*')
      
      return connection;
    }

// ---- DELETE ----

// deleteConnection() - deletes a connection by connection id

async function deleteConnection(id, userId) {
  const results = await db
    .from('connections')
    .where({ 
          'id': id,
          'userId': userId
          })
    .del()
  
  return results;
}
