  
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  /// see if there is a token and check if it is valid

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json ({ message: 'Not verified' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    })

  } else {
    res.status(400).json({ message: 'No token provided' });
  }
};