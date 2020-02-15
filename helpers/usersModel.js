const db = require('../data/db-config'); // imports database


// functions for dealing with CRU for users

module.exports = {
  // Create
  addUser,
  
  // Read
  getUserByEmail,
  getAllUsers,
  
  // Update
  updateUserByEmail
}

// ---- CREATE ----

// addUser(input) - creates a user

async function addUser(user) {
    const [newuser] = await db
        .from('users')
        .insert(user)
        .returning('*')
    
    return newuser || null;
}
      
// ---- READ ----

// getUserByEmail(email) - gets a user by the user email

async function getUserByEmail(email) {
    const [user] = await db
        .from('users')
        .where({ email })
    
    return user;
}

// GET ALL USERS

function getAllUsers() {
  return db('users').select('*')
}


// updateUserByEmail(update, email) - updates a user by email and returns "1" on confirmation

function updateUserByEmail(email, changes) {
    return db('users').where({ email }).update(changes);
}
