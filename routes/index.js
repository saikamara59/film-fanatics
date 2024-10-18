const router = require('express').Router();
// new code below
const passport = require('passport');

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
    // Which passport strategy is being used?
    'google',
    {
      // Requesting the user's profile and email
      scope: ['profile', 'email'],
      // Optionally force pick account every time
      // prompt: "select_account"
    }
  ));

  router.get('/oauth2callback', passport.authenticate(
    'google',
    {
      successRedirect: '/movies',
      failureRedirect: '/movies'
    }
  ));

  // OAuth logout route
router.get('/logout', function(req, res){
    req.logout(function() {
      res.redirect('/movies');
    });
  });