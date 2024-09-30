const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    
})


const movieSchema = new mongoose.Schema({
    movieName : { type: String,
        required: true },
        releaseYear:{type: Number,
            required: true},
            Genre: {type: String,
                required: true},
                stillInTheaters: {type: Boolean,
                    required: true},
                    description: {type: String,
                        required: true},
                        coverPhoto: {type:String,
                            required:true}

})