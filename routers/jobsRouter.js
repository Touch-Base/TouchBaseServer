const router = require('express').Router();
const Jobs = require('../helpers/jobModel');

// authentication middleware
const authentication = require('../middleware/authentication');


router.get('/getall', (req, res) => {
  Jobs.getAllJobs()
    .then(results => {
      res.status(201).json({ results })
    })
    .catch(err => {
      res.status(400).json({ message: err })
    })
})

/// ADD JOB TO USER WITH USER ID

router.post('/add', authentication, (req, res) => {
  const job = req.body;
  const userId = req.decodedToken.sub;
  
  Jobs.addJob(job, userId)
    .then(newJob => {
      res.status(201).json({
        newjob: newJob,
        message: 'New job added successfully!'
        })
      })
    .catch(err => {
      res.status(500).json({
        message: err
        })
      });
  });


module.exports = router;