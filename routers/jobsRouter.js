const router = require('express').Router();
const Jobs = require('../helpers/jobModel');

// authentication middleware
const authentication = require('../middleware/authentication');

/// GET ALL JOBS, FOR DEVELOPMENT

router.get('/get', (req, res) => {
  Jobs.getAllJobs()
    .then(results => {
      res.status(201).json({ results })
    })
    .catch(err => {
      res.status(400).json({ message: err })
    })
})

/// GET ALL JOBS FOR THE USER ID

router.get('/getall', authentication, (req, res) => {
  /// checks the user that is logged in and force passes their user ID as the parameter
  const userId = req.decodedToken.sub;

  Jobs.getJobsByUser(userId)
    .then(jobs => {
      res.status(200).json({ allJobs: jobs })
    })

    .catch(err => {
      res.status(401).json({ message: err })
    })
})

/// ADD JOB TO USER WITH USER ID

router.post('/add', authentication, (req, res) => {
  const job = req.body;

  /// checks the user that is logged in and force passes their user ID as the parameter
  const userId = req.decodedToken.sub;
  
  Jobs.addJob(job, userId)
    .then(newJob => {
      /// gets all jobs for user after success
      Jobs.getJobsByUser(userId)
        .then(jobs => {
          res.status(200).json({ allJobs: jobs })
        })

        .catch(err => {
          res.status(401).json({ message: err })
        })
    })
    .catch(err => {
      res.status(500).json({
        message: err
        })
      });
  });

/// UPDATE A JOB WITH USER ID

router.put('/update', authentication, (req, res) => {
  const changes = req.body;

  /// checks the user that is logged in and force passes their user ID as the parameter
  const userId = req.decodedToken.sub;
  console.log(userId);

  Jobs.updateJobById(changes, userId)
    .then(updated => {
      res.status(201).json({ 
        updatedjob: updated
      })
    })

    .catch(err => {
      res.status(400).json({ message: err })
    })

})

/// DELETES A JOB

router.delete('/delete', authentication, (req, res) => {
  const { id } = req.body;

  /// checks the user that is logged in and force passes their user ID as the parameter
  const userId = req.decodedToken.sub;

  Jobs.deleteJob(id, userId)
    .then(result => {
      res.status(201).json({ message: "Successfully deleted!", result: result })
    })

    .catch(err => {
      res.status(400).json({ message: err })
    })
})


module.exports = router;
