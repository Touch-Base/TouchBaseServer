
const router = require('express').Router();
const Connections = require('../helpers/connectionModel');

// authentication middleware
const authentication = require('../middleware/authentication');

// GET ALL CONNECTIONS FOR DEVELOPMENT

router.get('/get', (req, res) => {
  Connections.getAllConnections()
    .then(results => {
      res.status(201).json({ results })
    })
    .catch(err => {
      res.status(400).json({ message: err })
    })
});

/// GET ALL CONNECTIONS FOR THE USER ID

router.get('/getall', authentication, (req, res) => {
  /// checks the user that is logged in and force passes their user ID as the parameter
  const userId = req.decodedToken.sub;

  Connections.getConnectionsByUser(userId)
    .then(connections => {
      res.status(200).json({ allConnections: connections })
    })

    .catch(err => {
      res.status(401).json({ message: err })
    })
})

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
