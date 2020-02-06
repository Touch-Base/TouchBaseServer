const db = require('../../../database/db');  // imports database


// functions for dealing with CRU for users

module.exports = {
  // Create
  addUser,
  
  // Read
  getUserByEmail,
  
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

// getUserByEmail(email) - gets a user by the user email

async function getUserByEmail(email) {
    const [user] = await db
        .from('users')
        .where({ email })
    
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
