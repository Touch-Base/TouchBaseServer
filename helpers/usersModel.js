const db = require('../data/db-config'); // imports database


// functions for dealing with CRU for users

module.exports = {
  // Create
  addUser,
  
  // Read
  getUserByEmail,
  
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

// updateUserByEmail(update, email) - updates a user by the user id

async function updateUserByEmail(email, changes) {
    const [user] = await db
        .from('users')
        .update(changes)
        .where({ email })

    console.log(user);
        
    return user;
}
