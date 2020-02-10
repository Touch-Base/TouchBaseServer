
const router = require('express').Router();
const Connections = require('../helpers/connectionModel');

// authentication middleware
const authentication = require('../middleware/authentication');

// GET ALL CONNECTIONS

router.get('/get', (req, res) => {
  Connections.getAllConnections()
    .then(results => {
      res.status(201).json({ results })
    })
    .catch(err => {
      res.status(400).json({ message: err })
    })
});


module.exports = router;
