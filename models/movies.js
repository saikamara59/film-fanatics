const mongoose = require("mongoose");



const movieSchema = new mongoose.Schema({
    movieName : { type: String, required: true },
    releaseYear:{type: Number,required: true},
    genre: {type: String,required: true},
    stillInTheaters: {type: Boolean,required: true},
    description: {type: String,required: true},
    coverPhotoUrl: {type:String,required:true}
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = movieSchema