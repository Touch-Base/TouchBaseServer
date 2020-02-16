const db = require('../data/db-config'); // imports database


// functions for dealing with CRU for users

module.exports = {
  // Create
  addUser,
  
  // Read
  getUserById,
  getUserByEmail,
  getAllUsers,
  
  // Update
  updateUserById
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

// getUserById(id) - gets a user by the user id

async function getUserById(id) {
    console.log(id)
    const [user] = await db
        .from('users')
        .where({ id })
    
    console.log(user)
    
    return user;
}

async function getUserByEmail(email) {
    console.log(email)
    const [user] = await db
        .from('users')
        .where({ email })
    
    console.log(user)
    
    return user;
}

// GET ALL USERS

function getAllUsers() {
  return db('users').select('*')
}


// updateUserById(update, id) - updates a user by email and returns "1" on confirmation

function updateUserById(id, changes) {
    return db('users').where({ id }).update(changes);
}
