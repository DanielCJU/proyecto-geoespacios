const express = require('express');
const router = express.Router();
const pool = require('../database');

//const passport = require('passport');
//const { isLoggedIn } = require('../lib/auth');

// Registro de un nuevo usuario
router.get('/signupUser', (req, res) => {
    res.render('../views/authentication/signupUser');
  });

//Ingreso de datos y validaciones
router.post('/signupUser', (req, res, next) => {
    req.check('username')
    .notEmpty().withMessage('Username is required')
    .not().matches(/\W/).withMessage('Username may not contain special characters')
    /*.custom(async value => {
      const User = await pool.query('SELECT * FROM users WHERE username = ?', [req.body.username]);
      if(!User) {
        return value;
      }
    }).withMessage('User already exists');*/
    req.check('password')
    .notEmpty().withMessage('Password is required')
    .not().matches(/\W/).withMessage('Password may not contain special characters');
    req.check('checkpass', 'Password confirmation required').notEmpty();
    req.check('password', "Password confirmation is incorrect").custom(value => {
      if (value == req.body.checkpass) {
        return value;
      }
    });
    const errors = req.validationErrors();
    if (errors.length > 0) {
      req.flash('message', errors[0].msg);
      res.redirect('/signupUser');
    }  
    console.log(req.body);

    /*passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  })*/(req, res, next);
  });

  module.exports = router;