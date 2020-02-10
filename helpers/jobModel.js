const db = require('../data/db-config');  // imports database


// functions for dealing with CRUD for jobs

module.exports = {
  // Create
  addJob,
  
  // Read
  getJob,
  getAllJobs,
  getJobsByUser,
  
  // Update
  updateJobById,
  
  // Delete
  deleteJob
}

// ---- CREATE ----

// addJob(input) - inserts input to jobs and return results for a job by id inserted

async function addJob(input, userId) {
  const results = await db
    .from('jobs')
    .returning('id')
    .insert({ ...input, userId: userId })
   
   return getJob(results[0])
 }
 
// ---- READ ----

// getJob() - returns results for a job by id

async function getJob(id) {
  const [job] = await db
    .from('jobs')
    .select('*')
    .where({ id })
  
  return job || null;
}

// getJobsByUser() - returns all results for jobs for a user

async function getAllJobs() {
  const results = await db  
    .from('jobs')
    .select('*')

  return results;
}

async function getJobsByUser(userId) {
  const results = await db
    .from('jobs')
    .where({ 'jobs.userId': userId })
    .select('*')
            
 return results;
}
           
// ---- UPDATE ----
           
// updateJob() - updates a job by job id
           
async function updateJobById(changes, id) {

    /// matches job id and user id to correct job

    const [job] = await db
        .from('jobs')
        .update(changes)
        .where({ 
          'id': changes.id,
          'userId': id  
          })
        .returning('*')
      
      return job;
    }

// ---- DELETE ----

// deleteJob() - deletes a job by job id

async function deleteJob(id, userId) {
  const results = await db
    .from('jobs')
    .where({ 
          'id': id,
          'userId': userId
          })
    .del()
  
  return results;
}
      
 
