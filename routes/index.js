const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
//models

const User = require('../models/User');

router.get('/home', (req, res, next) => {
  res.render('home',{ title: "Home" });
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/register', (req, res, next) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      username,
      password : hash
    });
    const promise = user.save();
    promise.then((data) => {
      res.json(data)
    }).catch(err => {
      res.json(err);
    });
  });
});

router.post('/authenticate', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username },
    (err, user) => {
      if (err)
        throw err;
      if (!user) {
        res.json({
          status: false,
          message: 'Authentication faild, user not found.1111'
        });
      } else {
        bcrypt.compare(password, user.password).then((result) => {
          if (!result) {
            res.json({
              status: false,
              message: 'Authentication faild, user not found.xxxxx'
            });
          } 
          else {
            const payload = {
              username
            };
            const token = jwt.sign(payload, req.app.get('api_secret_key'),
              {
                expiresIn: 720 //dk cinsinden// 12 saat
              });
              if(!req.body.app) {
                res.json({
                  status: true,
                  token
                });
              } else {
                req.app.set('api_secret_key',token);
                res.writeHead(301,
                  {Location: 'home'}
                );
                res.end();
              }
          }
        });
      }
    });
});
module.exports = router;