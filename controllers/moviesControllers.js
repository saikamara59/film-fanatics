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


const addNewMovie = async (req, res) => {
    try {
        res.render('movies/new')
    } catch(err) {
        console.log(err)
        res.redirect('/')
    }
}


const createMovie = async (req, res) => {
    try {
        const { movieName, releaseYear, genre, description, coverPhotoUrl} = req.body;

        const newMovie = await models.Movie.create({
            movieName,
            releaseYear,
            genre,
            description,
            coverPhotoUrl,

        });

        res.redirect(`/movies`);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const seedMovies = async (req, res) => {
    try {
        const clearMovies = await models.Movie.deleteMany()
        console.log(clearMovies)
        const seededData = await models.Movie.create(moviesDB)
        res.send('Database sedded')
        // console.log(seededData)
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
    createMovie,
    editAReview,
    deleteAReview,
    addNewMovie,
    seedMovies
}