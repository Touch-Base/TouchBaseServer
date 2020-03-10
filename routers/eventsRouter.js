const router = require('express').Router();
const Events = require('../helpers/eventModel');

// authentication middleware
const authentication = require('../middleware/authentication');

// GET ALL EVENTS FOR DEVELOPMENT

router.get('/get', (req, res) => {
  Events.getAllEvents()
    .then(results => {
      res.status(201).json({ results })
    })
    .catch(err => {
      res.status(400).json({ message: err })
    })
});

/// GET ALL EVENTS FOR THE USER ID

router.get('/getall', authentication, (req, res) => {
  /// checks the user that is logged in and force passes their user ID as the parameter
  const userId = req.decodedToken.sub;

  Events.getEventsByUser(userId)
    .then(events => {
      res.status(200).json({ allEvents: events })
    })

    .catch(err => {
      res.status(401).json({ message: err })
    })
})

// ADD EVENT BY USER

router.post('/add', authentication, (req, res) => {
  
  const event = req.body;
  
  const userId = req.decodedToken.sub;
  
  Events.addEvent(event, userId) 
    .then(newEvent => {
      /// gets all events for user after success
      Events.getEventsByUser(userId)
        .then(events => {
          res.status(200).json({ allEvents: events })
        })

        .catch(err => {
          res.status(401).json({ message: err })
        })
     })
  
    .catch(err => {
      res.status(400).json({ message: err })
     })
});

/// UPDATE AN EVENT WITH USER ID

router.put('/update', authentication, (req, res) => {
  const changes = req.body;

  /// checks the user that is logged in and force passes their user ID as the parameter
  const userId = req.decodedToken.sub;

  Events.updateEventById(changes, userId)
    .then(updated => {
      res.status(201).json({ 
        updatedevent: updated
      })
    })

    .catch(err => {
      res.status(400).json({ message: err })
    })

})

/// DELETES AN EVENT

router.delete('/delete', authentication, (req, res) => {
  const id = parseInt(req.params.id);

  /// checks the user that is logged in and force passes their user ID as the parameter
  const userId = req.decodedToken.sub;

  Events.deleteEvent(id, userId)
    .then(result => {
    // returns the new array of jobs without the newly removed job
    Events.getEventsByUser(userId)
        .then(events => {
          res.status(200).json({ allEvents: events })
        })

        .catch(err => {
          res.status(401).json({ message: err })
        })
    })
})

module.exports = router;
