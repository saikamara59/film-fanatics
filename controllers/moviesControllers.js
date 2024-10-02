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


const createAReview = async (req,res) => {
    req.body.reviews = req.body.reviews === "on";
    try{
        await movie.create(req.body);
        res.redirect("/movies");
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};


module.exports = {
    getAllMovies,
    getOneMovie,
}