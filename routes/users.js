var express = require('express');
var router = express.Router();
var models = require('../models'); //<--- Add models
var authService = require('../services/auth'); //<--- Add authentication service


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Create new user if one doesn't exist
router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.Username
      },
      defaults: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: authService.hashPassword(req.body.Password)
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
      }
    });
});

// Login user and return JWT as cookie
router.post('/login', function (req, res, next) {
  console.log("request", req.body )
  models.users.findOne({
    where: {
      Username: req.body.Username
    }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        message: "Login Failed"
      });
    } else {
      let passwordMatch = authService.comparePasswords(req.body.Password, user.Password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.cookie({'jwt': token}, { httpOnly: true });
        res.json({'jwt': token});

      } else {
        console.log('Wrong password');
        res.send('Wrong password');
      }
    }
  });
});

//Secure Profile Route
router.get('/profile', function (req, res, next) {
  let token = req.cookies.token;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          res.json(user)
        } else {
          res.status(401);
          res.send('Invalid authentication token');
        }
      });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});

//Logout Route
router.get('/logout', function (req, res, next) {
  res.cookie('token', "", { expires: new Date(0) });
  res.send('Logged out');
  });

module.exports = router;
