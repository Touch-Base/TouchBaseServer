
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
    .then(newConnection => {
    /// gets all jobs for user after success
      Connections.getConnectionsByUser(userId)
        .then(connections => {
          res.status(200).json({ allConnections: connections })
        })

        .catch(err => {
          res.status(401).json({ message: err })
        })
     })
  
    .catch(err => {
      res.status(400).json({ message: err })
     })
});

/// UPDATE A CONNECTION WITH USER ID

router.put('/update', authentication, (req, res) => {
  const changes = req.body;

  /// checks the user that is logged in and force passes their user ID as the parameter
  const userId = req.decodedToken.sub;

  Connections.updateConnectionById(changes, userId)
    .then(updated => {
      res.status(201).json({ 
        updatedconnection: updated
      })
    })

    .catch(err => {
      res.status(400).json({ message: err })
    })

})

/// DELETES A CONNECTION

router.delete('/delete/:id', authentication, (req, res) => {
  const id = parseInt(req.params.id);

  /// checks the user that is logged in and force passes their user ID as the parameter
  const userId = req.decodedToken.sub;

  Connections.deleteConnection(id, userId)
    
    .then(result => {
    // returns the new array of jobs without the newly removed job
    Connections.getConnectionsByUser(userId)
        .then(connections => {
          res.status(200).json({ allConnections: connections })
        })

        .catch(err => {
          res.status(401).json({ message: err })
        })
    })

    .catch(err => {
      res.status(400).json({ message: err })
    })
})

module.exports = router;
