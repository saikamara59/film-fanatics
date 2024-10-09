const express = require("express");
const bcrypt = require("bcrypt");


const User = require("../models/user")

const router = express.Router();
// routerName = function exported by express.Router()
// express will 'use' this router function for checking all auth related routes

// define a sign up route (register)
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

// define a sign in GET route (render view)
router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});

// register (create user) route
// /auth/auth/sign-up
router.post("/sign-up", async (req, res) => {
  // console.log(req.body)
  // Usernames need to be unique - if a user is found - send back error -> username already exists.
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (userInDatabase) {
    return res.send("Username already taken.");
  }

  // The password and confirmPassword fields must match to verify there were no typos.
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match!");
  }

  // Hash - scrambled the plain text password into an encrypted string
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  console.log(hashedPassword, "<< raw string: ", req.body.password);

  req.body.password = hashedPassword;
  const user = await User.create(req.body);
  res.send("hitting post route for user create: " + user.username);
});

// define a sign in POST route (login)
router.post("/sign-in", async (req, res) => {
  // involve comparing the provided plaintext password (after a new hash) -> to what is in the DB
  const userInDatabase = await User.findOne({ username: req.body.username });

  if (!userInDatabase) {
    return res.send("Login Failed...");
  }

  // if a match the user is who they claim to be -> they are authenticated

  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  );
  console.log("validPassword", validPassword);

  // if not a match - thrown an error
  if (!validPassword) {
    return res.send("Login Failed...");
  }

  // session last step to persist authentication status
  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
    // other session data might go here
  };

  // after session is created, redirect to landing page (profile, feed, public trending page )
  res.redirect("/");
});

router.get("/sign-out", async (req, res) => {
  await req.session.destroy();
  res.redirect("/");
});

// test route to demo the controller router syntax
router.get("/test", (req, res) => res.send("hitting auth test"));

// export router function

module.exports = router;