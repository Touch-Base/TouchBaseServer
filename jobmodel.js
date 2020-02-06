const db = require('../../../datanase/db');  // imports database


// functions for dealing with CRUD for jobs

module.exports = {
  // Create
  addJob,
  getJob,
  getJobsByUser,
  updateJob,
  deleteJob
}

// ---- CREATE ----

// addJob(input) - inserts input to jobs and return results for a job by id inserted

async function addJob(input, userId) {
  const results = await db('jobs')
    .returning('id')
    .insert({ ...input, userId: userId })
   
   return getJob(results[0])
 }
 
// ---- READ ----

// getJob() - returns results for a job by id

async function getJob(id) {
  const [job] = awaitd db
    .from('jobs')
    .select('*')
    .where({ id })
  
  return job || null;
}

// getJobsByUser() - returns all results for jobs for a user

async function getJobsByUser(userId) {
  const results = await db('jobs')
    .where({ 'jobs.userId': userId })
    .select('*')
            
 return results;
}
           
// ---- UPDATE ----
           
// updateJob() - updates a job by job id
           
async function updateJob(changes, id) {
      const [job] = await db
        .from('jobs')
        .update(changes)
        .where({ id })
        .returning('*')
      
      return job;
    }

// ---- DELETE ----

// deleteJob() - delets a job by job id

async function deleteJob(id) {
  const results = await db
    .from('jobs')
    .where({ id })
    .del()
  
  return results;
}
      
 
