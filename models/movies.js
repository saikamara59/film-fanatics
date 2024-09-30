const mongoose = require("mongoose");



const movieSchema = new mongoose.Schema({
    movieName : { type: String, required: true },
    releaseYear:{type: Number,required: true},
    genre: {type: String,required: true},
    stillInTheaters: {type: Boolean,required: true},
    description: {type: String,required: true},
    coverPhotoUrl: {type:String,required:true}
})

const userReviewSchema = new mongoose.Schema({
    userReviewName: { type: String, required: true},
    reviews: {type: String, required: true},
    // likes and dislike should be a string or no ?
})



const Movie = mongoose.model('Movie', movieSchema,userReviewSchema)

module.exports = movieSchema;