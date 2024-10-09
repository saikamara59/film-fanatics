const express = require("express");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require('path');
const movieController = require("./controllers/moviesControllers");
const authController= require("./controllers/auth")
const session = require("express-session")

dotenv.config();
const app = express();
app.set("view engine", "ejs");
  
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
});

mongoose.connection.on("error", (err) => { 
});

const PORT = process.env.PORT || 4000 

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 
app.use(morgan("dev")); 
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
     secret: process.env.SESSION_SECRET,
    resave:false,
    saveUnitialized: true,
  })
)

app.use((req, res, next) => {
  if (req.session.user) {
    //check if a session user object is defined (created after login)
    res.locals.user = req.session.user;
    // it if does, update all res object's context with that user data.
    // this allows you to access user data to be available without having to set the context for each route
  }else {
    res.locals.user = null
  }
  next();
  // exits the current function and passes the (updated) request to the next set of routes
});

app.use("/auth", authController);
  

const Movie = require("./models/movies")

app.get('/', movieController.getAllMovies)  

app.get('/movies/new', movieController.createForm)

app.get("/movies/:id/edit",movieController.editForm)

app.get('/movies/seed', movieController.seedMovies)

app.get("/movies/:id", movieController.getOneMovie)

app.get("/movies/:id/review/new", movieController.addReview)

app.get('/user-profile',(req,res)=>{
  if(req.session.user){
    res.render('profile/private.ejs')
  } else {
    res.send('Sorry, no guests allowed')
  }
})

app.get("/", (req, res) => {
  // res.render -> generates new HTML from a template file
  res.render("home.ejs", { user: req.session.user }); // locate a file in views -> <filename> -> create a copy of the template
});

app.post("/movies/:id/review", movieController.createReview)

app.post("/movies",movieController.createMovie)

app.put("/movies/:id",movieController.editMovie)

app.delete("/movies/:id",movieController.deleteAMovie)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

 

