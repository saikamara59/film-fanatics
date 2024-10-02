const movie = require("../models/movies");


const getAllMovies = async (req,res) => {
    try {
        const allMovies = await movie.find();
        res.render("movies/index", {movies: allMovies, message: "Hello World"});
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
};


const getOneMovie = async (req,res) => {
    try {
        const foundMovie = await movie.findbyId(req.params.id);
        const contextMovie = { Movies:foundMovie};
        res.render("movies/show",contextMovie)
    }catch (err) {
        console.log(err);
        res.redirect("/");
    }
}





module.exports = {
    getAllMovies,
    getOneMovie,
}