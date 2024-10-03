const mongoose = require('mongoose')
const models = require("../models/movies");
const moviesDB = require('../DB/moviesDB')

const getAllMovies = async (req,res) => {
    try {
        const allMovies = await models.UserReview.find();
        res.render("movies/index", {movies: allMovies, moviesDB: moviesDB, message: "Hello World"});
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
};


const getOneMovie = async (req,res) => {
    try {
        const foundMovie = await models.Movie.findById(req.params.id);
        res.render(`movies/show`, { Movies: foundMovie, moviesDB: moviesDB })

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


const createAReview = async (req, res) => {
    try {
        const { movieName, releaseYear, genre, stillInTheaters, description, coverPhotoUrl, userName, reviews, action } = req.body;

        const newMovie = await models.Movie.create({
            movieName,
            releaseYear,
            genre,
            description,
            coverPhotoUrl,
            userReviews: [
                {
                    userName,
                    reviews,
                    likes: action === 'like' ? 1 : 0,
                    dislikes: action === 'dislike' ? 1 : 0
                }
            ]
        });

        res.redirect("/movies/new");
    } catch (err) {
        res.status(400).json({ error: err.message });
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
    createAReview,
    editAReview,
    deleteAReview,
    addNewMovie
}