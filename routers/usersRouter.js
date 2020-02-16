const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../helpers/usersModel.js');
const jwt = require('jsonwebtoken');

// authentication middleware
const authentication = require('../middleware/authentication');

// GET USERS

router.get('/getall', (req, res) => {

  Users.getAllUsers()
    .then(users => {
      res.status(201).json({ users: users })
    })
    .catch(err => {
      console.log(err)
    })
})


// GET USER BY EMAIL WITH TOKEN

router.get('/useremail', authentication, (req, res) => {

  const email = req.decodedToken.email;

  Users.getUserByEmail(email) 
    .then(user => {
      res.status(201).json({ user: user })
    })

    .catch(err => {
      res.status(500).json({ message: err })
    })
});

// USER REGISTER

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); 
  user.password = hash;

  // Adds a new user
  
  Users.addUser(user)
    .then(saved => {

      /// creates token for the user
      const token = generateToken(saved);

      res.status(201).json({
        user: saved,
        token
      });
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: error });
    });
});


// USER LOGIN

router.post('/login', (req, res) => {
  let { email, password } = req.body;
  
  // Finds user by email

  Users.getUserByEmail(email)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          user: user,
          message: `Welcome ${user.firstname}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// UPDATE USER WITH TOKEN

router.put('/update', authentication, (req, res) => {
  let changes = req.body;
  
  const id = req.decodedToken.sub;
  
  Users.updateUserById(id, changes)
    .then(newUser => {

        // after successfully updating, returns the updated user
      
      Users.getUserById(id) 
        .then(user => {
          res.status(201).json({ confirmation: newUser, user: user })
      })

        .catch(err => {
          res.status(500).json({ message: "Couldn't get user" })
        })
    })
      
    .catch(error => {
      res.status(500).json({ message: error });
      })
 });
    
    


// GENERATES A CRYPTED TOKEN BASED ON EMAIL AND USER ID

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.email
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = router;
