const express = require('express');
const router = express.Router();
const passport = require('passport');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

// Redirect root of auth router to the login page
router.get('/', (req, res) => res.redirect('/login'));

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', [
  check('email').isEmail().withMessage('Correo inválido'),
  check('password').notEmpty()
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('login', { errors: errors.array() });
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.render('login', { errors: [{ msg: info.message }] }); }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.redirect('/auth/google');
    });
  })(req, res, next);
});

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login'
}), (req, res) => {
  res.redirect('/dashboard');
});

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
});

module.exports = router;
