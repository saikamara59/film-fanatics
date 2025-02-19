const express = require("express");
const bcrypt = require("bcrypt");
const router = require('express').Router();
const passport = require('passport');
const User = require("../models/user");

// Sign up route (register)
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

// Sign in route
router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs", { error: req.query.error });
});

// Handle sign-up
router.post("/sign-up", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.status(400).send("Username already taken.");
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).send("Password and Confirm Password must match!");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);

    res.redirect("/auth/sign-in");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user.");
  }
});

// Handle sign-in
router.post("/sign-in", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });

    if (!userInDatabase) {
      return res.status(401).send("Invalid username or password.");
    }

    const validPassword = await bcrypt.compare(req.body.password, userInDatabase.password);
    if (!validPassword) {
      return res.status(401).send("Invalid username or password.");
    }

    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
    };

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in.");
  }
});

// Google OAuth login
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback
router.get('/oauth2callback', passport.authenticate('google', {
  successRedirect: '/movies',
  failureRedirect: '/auth/sign-in',
}));

// Handle sign-out
router.get("/sign-out", async (req, res) => {
  await req.session.destroy();
  res.redirect("/movies");
});

// Test route
router.get("/test", (req, res) => res.send("Hitting auth test"));

module.exports = router;

