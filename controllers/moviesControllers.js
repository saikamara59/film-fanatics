const mongoose = require('mongoose')
const models = require("../models/movies");
const moviesDB = require('../DB/moviesDB')


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
        const foundMovie = await models.Movie.findById(req.params.id);
        res.render(`movies/show`, { movie: foundMovie })

    }catch (err) {
        console.log(err);
        res.redirect("/");
    }
}



const createReview = async (req, res) => {
    try {
        const movie = await models.Movie.findById(req.params.id)
        movie.userReviews.push(req.body)
        await movie.save()
        res.redirect(`/movies/${req.params.id}`);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const addReview = async (req, res) => {
    const movieId = req.params.id
    res.render('movies/review', {movieId})
}


2

const seedMovies = async (req, res) => {
    try {
        const clearMovies = await models.Movie.deleteMany()
        console.log(clearMovies)
        const seededData = await models.Movie.create(moviesDB)
        res.send('Database sedded')
    } catch (err) {
        res.send('Error here')
        console.log(err)
    }
}


const editAReview = async (req,res) => {
    try {
        const methodOverrideovie = await models.Movie.findbyIdAndUpdate(req.params.movieId);
    } catch (err) {
        console.log(err) 
        res.redirect(`/movies/${req.params.id}`);
    }
}


const deleteAReview = async (req,res) => {
    try{
        await models.UserReview.findByIdAndDelete(req.params.id);
        console.log(deletedReviews,"response from db after deleting")
        res.redirect("/movies");
    } catch (err) {
        console.log(err);
        res.redirect(`/`)
    }
}




module.exports = {
    getAllMovies,
    getOneMovie,
    editAReview,
    deleteAReview,
    seedMovies,
    createReview,
    addReview
}