const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/status'
  }),
  (req, res) => {
    res.redirect('/api-docs');
  }
);

router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      authenticated: true,
      user: req.user
    });
  }

  res.status(200).json({
    authenticated: false
  });
});

router.get('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy(() => {
      res.redirect('/api-docs');
    });
  });
});

module.exports = router;