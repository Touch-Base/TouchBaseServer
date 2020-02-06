const db = require('../../../database/db');  // imports database


// functions for dealing with CRU for users

module.exports = {
  // Create
  addUser,
  
  // Read
  getUserById,
  
  // Update
  updateUserById
}

// ---- CREATE ----

// addUser(input) - creates a user

async function addUser(user) {
    const [user] = await db
        .from('users')
        .insert(user)
    
    return user || null;
}
      
// ---- READ ----

// getUserById(id) - gets a user by the user id

async function getUserById(id) {
    const [user] = await db
        .from('users')
        .where({ id })
    
    return user;
}

// updateUserById(update, id) - updates a user by the user id

async function updateUserById(changes, id) {
    const [user] = await db
        .from('users')
        .update(changes)
        .where({ id })
        
    return user;
}
