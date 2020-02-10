const router = require('express').Router();
const Jobs = require('../helpers/jobModel');

// authentication middleware
const authentication = require('../middleware/authentication');

/// GET ALL JOBS, FOR DEVELOPMENT

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

  /// checks the user that is logged in and force passes their user ID as the parameter
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

/// UPDATE A JOB WITH USER ID

router.put('/update', authentication, (req, res) => {
  const changes = req.body;

  /// checks the user that is logged in and force passes their user ID as the parameter
  const userId = req.decodedToken.sub;

})


module.exports = router;