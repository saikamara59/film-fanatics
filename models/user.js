const mongoose = require("mongoose");

// define schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // LU - explore string validators to make sure the string is > 2/3 chars
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // LU -> TO STORE: favoritesMovies 
        // 1. create favoriteMovies Schema
        // 2. add a field to the userSchema -> favorites: [ favoriteMoviesSchema ]
  },
  {
    timestamps: true,
  }
);
// register the model in DB
const User = mongoose.model("User", userSchema);

// export the model to be used in ˝the controller
module.exports = User;