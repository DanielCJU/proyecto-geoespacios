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
    .notEmpty().withMessage('Nombre de usuario requerido')
    .not().matches(/\W/).withMessage('Sólo se permiten números, letras y guión bajo para el nombre de usuario')
    /*.custom(async value => {
      const User = await pool.query('SELECT * FROM users WHERE username = ?', [req.body.username]);
      if(!User) {
        return value;
      }
    }).withMessage('User already exists');*/
    req.check('password')
    .notEmpty().withMessage('Contraseña requerida')
    .not().matches(/\W/).withMessage('Sólo se permiten números, letras y guión bajo bajo para la contraseña');
    req.check('checkpass', 'Se requiere confirmación de la contraseña').notEmpty();
    req.check('password', "La confirmación de la contraseña es incorrecta").custom(value => {
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

// Inicio de sesión Usuarios
router.get('/signinUser', (req, res) => {
    res.render('../views/authentication/signinUser');
  });

router.post('/signinUser', (req, res, next) => {
  req.check('username', 'Nombre de usuario requerido').notEmpty();
  req.check('password', 'Contraseña requerida').notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/signinUser');
  }
  console.log(req.body);
  /*passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })*/(req, res, next);
});

// Inicio de sesión Administrador
router.get('/signinAdm', (req, res) => {
    res.render('../views/authentication/signinAdm');
  });

router.post('/signinAdm', (req, res, next) => {
  req.check('username', 'Nombre de administrador requerido').notEmpty();
  req.check('password', 'Contraseña requerida').notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/signinUser');
  }
  console.log(req.body);
  /*passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })*/(req, res, next);
});

  module.exports = router;