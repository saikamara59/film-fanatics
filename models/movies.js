const mongoose = require("mongoose");



const userReviewSchema = new mongoose.Schema({
    reviews: {type: String, required: true},
    likes: { type: Number, default: 0},
    dislikes:{type: Number, default: 0},
});

const movieSchema = new mongoose.Schema({
    movieName : { type: String, required: true },
    releaseYear:{type: Number,required: true},
    genre: {type: String,required: true},
    stillInTheaters: {type: Boolean,required: true},
    description: {type: String,required: true},
    coverPhotoUrl: {type:String,required:true},
    userId: { type: String, required: true },
    userReviews: [userReviewSchema]
});




const UserReview = mongoose.model("UserReview",userReviewSchema)

const Movie = mongoose.model('Movie', movieSchema)

module.exports = {
    UserReview,
    Movie
};