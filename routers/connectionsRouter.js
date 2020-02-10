
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

// ADD CONNECTION BY USER

router.post('/add', authentication, (req, res) => {
  
  const connection = req.body;
  
  const userId = req.decodedToken.sub;
  
  Connections.addConnection(connection, userId) 
    .then(result => {
      res.status(201).json({ result })
     })
  
    .catch(err => {
      res.status(400).json({ message: err })
     })
});


module.exports = router;
