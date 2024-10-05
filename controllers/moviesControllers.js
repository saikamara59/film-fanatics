// const mongoose = require('mongoose')
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
        console.log('test a movie')
        console.log(foundMovie)
        res.render(`movies/show`, { movie: foundMovie })
       
    } catch (err) {
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

        res.redirect(`/`);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


const createReview = async (req, res) => {
    try {
        const movie = await models.Movie.findById(req.params.id)
        movie.userReviews.push(req.body)
        await movie.save()
        res.redirect(`/`);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const addReview = async (req, res) => {
    const movie = await models.Movie.findById(req.params.id)
    // movie.userReviews.push(req.body)
    
    console.log(movie.userReviews)
    res.render('movies/review',{movie})
}



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


// const deleteAReview = async (req,res) => {
//     try{
//         await models.UserReview.findByIdAndDelete(req.params.id);
//         console.log(deletedReviews,"response from db after deleting")
//         res.redirect("/movies");
//     } catch (err) {
//         console.log(err);
//         res.redirect(`/movies/${req.params.id}`);
//     }
// }

const deleteAMovie = async (req,res) => {
    await models.Movie.findByIdAndDelete(req.params.id)
    res.redirect("/")
}




module.exports = {
    getAllMovies,
    getOneMovie,
    createMovie,
    editAReview,
    // deleteAReview,
    addNewMovie,
    seedMovies,
    createReview,
    addReview,
    deleteAMovie
}