const models = require('../models/movies')

const movies = [
    {
      id: 1,
      movieName: "Inception",
      releaseYear: 2010,
      genre: "Sci-Fi",
      director: "Christopher Nolan",
      stillInTheaters: false,
      coverPhotoUrl: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg",
      description: "A skilled thief who specializes in entering the subconscious of others must perform his most dangerous mission: planting an idea into someone’s mind."
    },
    {
      id: 2,
      movieName: "The Godfather",
      year: 1972,
      genre: "Crime, Drama",
      director: "Francis Ford Coppola",
      stillInTheaters: false,
      coverPhotoUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
      description: "The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son in this classic mafia tale."
    },
    {
      id: 3,
      movieName: "Parasite",
      year: 2019,
      genre: "Thriller, Drama",
      director: "Bong Joon Ho",
      stillInTheaters: false,
      coverPhotoUrl: "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png",
      description: "A poor family schemes to become employed by a wealthy household by posing as unrelated, highly qualified individuals."
    },
    {
      id: 4,
      movieName: "The Dark Knight",
      year: 2008,
      genre: "Action, Crime",
      director: "Christopher Nolan",
      stillInTheaters: false,
      coverPhotoUrl: "https://musicart.xboxlive.com/7/abb02f00-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080",
      description: "Batman faces off against the Joker, a criminal mastermind intent on plunging Gotham City into chaos."
    },
    {
      id: 5,
      movieName: "Pulp Fiction",
      year: 1994,
      genre: "Crime, Drama",
      director: "Quentin Tarantino",
      stillInTheaters: false,
      coverPhotoUrl: "https://www.popphoto.com/uploads/2021/12/03/Pulp-vertical.jpg?auto=webp",
      description: "Interconnected stories of crime, redemption, and violence unfold in Tarantino's cult classic film, blending dark humor and shocking twists."
    }
  ];
  
  module.exports = movies;
  