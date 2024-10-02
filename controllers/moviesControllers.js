const mongoose = require('mongoose')
const models = require("../models/movies");


const getAllMovies = async (req,res) => {
    try {
        const allMovies = await models.Movie.find();
        res.render("movies/index", {movies: allMovies, message: "Hello World"});
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
};


const getOneMovie = async (req,res) => {
    try {
        const foundMovie = await models.Movie.findbyId(req.params.id);
        const contextMovie = { Movies:foundMovie};
        res.render("movies/show",contextMovie)
    }catch (err) {
        console.log(err);
        res.redirect("/");
    }
}


const createAReview = async (req, res) => {
    req.body.reviews = req.body.reviews === "on";
    try {
        await models.UserReview.create(req.body);
        res.redirect("/movies");
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

const editAReview = async (req,res) => {
    try {
        const methodOverrideovie = await models.Movie.findbyIdAndUpdate(req.params.movieId);
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