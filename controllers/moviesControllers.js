const Movie = require("../models/movies");
// const UserReview = require("../models/UserReview")

const getAllMovies = async (req,res) => {
    try {
        const allMovies = await Movie.find();
        res.render("movies/index", {movies: allMovies, message: "Hello World"});
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
};


const getOneMovie = async (req,res) => {
    try {
        const foundMovie = await Movie.findById(req.params.id);
        const contextMovie = { movie:foundMovie};
        res.render("movies/show",contextMovie)
    }catch (err) {
        console.log(err);
        res.redirect("/");
    }
}


const createAReview = async (req, res) => {
    req.body.reviews = req.body.reviews === "on";
    try {
        await userId.create(req.body);
        res.redirect("/movies");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


const editAReview = async (req,res) => {
    try {
        const Movie = await Movie.findByIdAndUpdate(req.params.movieId);
    } catch (err) {
        console.log(err) 
        res.redirect(`/movies/${req.params.id}`);
    }
}


module.exports = {
    getAllMovies,
    getOneMovie,
    createAReview,
    editAReview,
}