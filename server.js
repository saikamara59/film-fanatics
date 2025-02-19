const express = require("express");
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require('path');
const session = require("express-session");
const passport = require('passport');

// Controllers
const movieController = require("./controllers/moviesControllers");
const authController = require("./controllers/auth");

// Models
const Movie = require("./models/movies");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.set("view engine", "ejs");

// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// App port
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Session configuration
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Passport initialization
// require('./config/passport'); // Load Passport configuration
app.use(passport.initialize());
app.use(passport.session());

// Set `res.locals.user` for all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null; // Default to null if no user is logged in
  next();
});

// Routes
app.use("/auth", authController);

// Movie routes
app.get('/movies', movieController.getAllMovies);
app.get('/movies/new', movieController.createForm);
app.get("/movies/:id/edit", movieController.editForm);
app.get('/movies/seed', movieController.seedMovies);
app.get("/movies/:id", movieController.getOneMovie);
app.get("/movies/:id/review/new", movieController.addReview);

app.post("/movies/:id/review", movieController.createReview);
app.post("/movies", movieController.createMovie);

app.put("/movies/:id", movieController.editMovie);
app.delete("/movies/:id", movieController.deleteAMovie);

// User profile route
app.get('/user-profile', (req, res) => {
  if (req.session.user) {
    res.render('profile/private.ejs');
  } else {
    res.status(403).send('Sorry, no guests allowed');
  }
});

// Home route
app.get("/", (req, res) => {
  res.render("home.ejs", { user: req.session.user });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

 

