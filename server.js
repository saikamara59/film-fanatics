const express = require("express");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require('path')




// App configs
dotenv.config();
const app = express();
app.set("view engine", "ejs");
 

const PORT = process.env.PORT || 4000 

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 
app.use(morgan("dev")); 
app.use(express.static(path.join(__dirname, "public")));
  

// mongoose connection 

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB.`);
});

mongoose.connection.on("error", (err) => {
  console.log(err); 
});

app.get('/', (req, res) => {
  res.render('index')
})  
 



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})



