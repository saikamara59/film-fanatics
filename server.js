const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")

const methodOverride = require("method-override")

// App = configs
const app = express();

dotenv.config();

const PORT = process.envPORT || 4000


// mongoose connection event listener
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

  mongoose.connection.on("error", (err) => {
    console.log(err);
  });

  

  
  app.use(express.static(path.join(__dirname,"public")));



  app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`);
  })


