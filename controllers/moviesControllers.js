const movie = require("../models/movies");


const getAllMovies = async (req,res) => {
    try {
        const allMovies = await movie.find();
        res.render("movies/index" {movies: allMovies, message: "Hello World"});
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
};








module.exports = {
    getAllMovies
}