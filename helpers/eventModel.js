const db = require('../data/db-config');  // imports database


// functions for dealing with CRUD for events

module.exports = {
  // Create
  addEvent,
  
  // Read
  getEvent,
  getAllEvents,
  getEventsByUser,
  
  // Update
  updateEventById,
  
  // Delete
  deleteEvent
}


// ---- CREATE ----

// addEvent(input) - inserts input to events and returns results by userId

async function addEvent(input, userId) {
  const results = await db
    .from('events')
    .returning('id')
    .insert({ ...input, userId: userId })
   
   return getEvent(results[0])
 }
 
// ---- READ ----

// getEvent() - returns results for a event by id

async function getEvent(id) {
  const [event] = await db
    .from('events')
    .select('*')
    .where({ id })
  
  return event || null;
}

// getAllEvents() - returns all results for events

async function getAllEvents() {
  const results = await db  
    .from('events')
    .select('*')

  return results;
}

// getEventsByUser() - returns all events for a user by id

async function getEventsByUser(userId) {
  const results = await db
    .from('events')
    .where({ 'events.userId': userId })
    .select('*')
  
  return results;
}

// ---- UPDATE ----
           
// updateEventById() - updates an event by event id
           
async function updateEventById(changes, id) {

    /// matches event id and user id to correct event

    const [event] = await db
        .from('events')
        .update(changes)
        .where({ 
          'id': changes.id,
          'userId': id  
          })
        .returning('*')
      
      return event;
    }

// ---- DELETE ----

// deleteEvent() - deletes an event by event id

async function deleteEvent(id, userId) {
  const results = await db
    .from('events')
    .where({ 
          'id': id,
          'userId': userId
          })
    .del()
  
  return results;
}
