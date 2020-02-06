const db = require('../../../datanase/db');  // imports database


// functions for dealing with CRUD for jobs

module.exports = {
  // Create
  addJob
}

// CREATE

// addJob(input) - inserts input to jobs and return results for a job by id inserted

async function addJob(input, userId) {
  const results = await db('jobs')
    .returning('id')
    .insert({ ...input, userId: userId })
   
   return getJob(results[0])
 }
 
 
