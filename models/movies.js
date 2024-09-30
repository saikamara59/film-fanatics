const mongoose = require("mongoose");



const movieSchema = new mongoose.Schema({
    movieName : { type: String, required: true },
    releaseYear:{type: Number,required: true},
    genre: {type: String,required: true},
    stillInTheaters: {type: Boolean,required: true},
    description: {type: String,required: true},
    coverPhotoUrl: {type:String,required:true},
    userId:{ type: String,required:true}
});

const userReviewSchema = new mongoose.Schema({
    userReviewName: { type: String, required: true},
    reviews: {type: String, required: true},
    likes: { type: Number, default: 0},
    dislikes:{type: Number, default: 0},
    userId: {type: String, required: true}
});

const UserReview = mongoose.model("UserReview",userReviewSchema)

const Movie = mongoose.model('Movie', movieSchema)

module.exports = {movieSchema,UserReview};