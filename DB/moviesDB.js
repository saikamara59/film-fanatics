const models = require('../models/movies')

const movies = [
    {
      id: 1,
      title: "Inception",
      year: 2010,
      genre: "Sci-Fi",
      rating: 8.8,
      director: "Christopher Nolan",
      stillInTheaters: false,
      coverUrl: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg",
      description: "A skilled thief who specializes in entering the subconscious of others must perform his most dangerous mission: planting an idea into someone’s mind."
    },
    {
      id: 2,
      title: "The Godfather",
      year: 1972,
      genre: "Crime, Drama",
      rating: 9.2,
      director: "Francis Ford Coppola",
      stillInTheaters: false,
      coverUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
      description: "The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son in this classic mafia tale."
    },
    {
      id: 3,
      title: "Parasite",
      year: 2019,
      genre: "Thriller, Drama",
      rating: 8.5,
      director: "Bong Joon Ho",
      stillInTheaters: false,
      coverUrl: "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png",
      description: "A poor family schemes to become employed by a wealthy household by posing as unrelated, highly qualified individuals."
    },
    {
      id: 4,
      title: "The Dark Knight",
      year: 2008,
      genre: "Action, Crime",
      rating: 9.0,
      director: "Christopher Nolan",
      stillInTheaters: false,
      coverUrl: "https://musicart.xboxlive.com/7/abb02f00-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080",
      description: "Batman faces off against the Joker, a criminal mastermind intent on plunging Gotham City into chaos."
    },
    {
      id: 5,
      title: "Pulp Fiction",
      year: 1994,
      genre: "Crime, Drama",
      rating: 8.9,
      director: "Quentin Tarantino",
      stillInTheaters: false,
      coverUrl: "https://www.popphoto.com/uploads/2021/12/03/Pulp-vertical.jpg?auto=webp",
      description: "Interconnected stories of crime, redemption, and violence unfold in Tarantino's cult classic film, blending dark humor and shocking twists."
    }
  ];
  
  module.exports = movies;
  