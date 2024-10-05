const express = require("express");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require('path');
const movieController = require("./controllers/moviesControllers");

 
// App configs
dotenv.config();
const app = express();
app.set("view engine", "ejs");
  

const PORT = process.env.PORT || 4000 

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 
app.use(morgan("dev")); 
app.use(express.static(path.join(__dirname, "public")));
  

// mongoose connection 

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB.`);
});

mongoose.connection.on("error", (err) => {
  console.log(err); 
});


const Movie = require("./models/movies")


// Routes
app.get('/', movieController.getAllMovies)  

app.get('/movies/new', movieController.createForm)

app.get("/movies/:id/edit",movieController.editForm)

app.get('/movies/seed', movieController.seedMovies)

app.get("/movies/:id", movieController.getOneMovie)

app.get("/movies/:id/review/new", movieController.addReview)

app.post("/movies/:id/review", movieController.createReview)

app.post("/movies",movieController.createMovie)

// app.put("movies/:id",movieController.editAReview);

app.put("/movies/:id",movieController.editMovie)
// app.post("/movies", movieController.createMovie)


// app.delete("movies/:id/review/:reviewId",movieController.deleteAReview)

app.delete("/movies/:id",movieController.deleteAMovie)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

 

