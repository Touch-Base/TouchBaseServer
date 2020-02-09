const router = require('express').Router();
const Jobs = require('../helpers/jobModel');

// authentication middleware
const authentication = require('../middleware/authentication');


/// ADD JOB TO USER WITH USER ID

router.post('/add', authentication, (req, res) => {
  const job = req.body;
  const { id } = req.body;
  
  Jobs.addJob(job, id)
    .then(job => {
      res.status(201).json({
        newjob: job,
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