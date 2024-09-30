const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require('path')


const app = express();


// App configs
dotenv.config();
app.set("view engine", "ejs");


const PORT = process.env.PORT || 4000 



// mongoose connection 

// mongoose.connect(process.env.MONGODB_URI); 

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));




app.listen(PORT,() => {
  console.log(`Listening on port ${PORT}`);
})

app.get('/', (req, res) => {
  res.send('Hello')
})

