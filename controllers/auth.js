const express = require("express");
const bcrypt = require("bcrypt");
const router = require('express').Router();
const passport = require('passport');
const User = require("../models/user");

// Sign up route (register)
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});

router.post("/sign-up", async (req, res) => {
  
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (userInDatabase) {
    return res.send("Username already taken.");
  }

  
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match!");
  }

  
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;
  const user = await User.create(req.body);
  res.send("User created: " + user.username);
});


router.post("/sign-in", async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });

  if (!userInDatabase) {
    return res.send("Login Failed...");
  }

  const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password);
  if (!validPassword) {
    return res.send("Login Failed...");
  }

  // Persist authentication status
  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
  };

  res.redirect("/"); // Redirect after successful login
});


router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/oauth2callback', passport.authenticate('google', {
  successRedirect: '/movies',
  failureRedirect: '/auth/sign-in' // Adjust as needed
}));


router.get("/sign-out", async (req, res) => {
  await req.session.destroy();
  res.redirect("/"); // Redirect after logout
});


router.get("/test", (req, res) => res.send("hitting auth test"));


module.exports = router;
