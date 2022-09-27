const express = require('express');
const app = express();
const connectDB = require("./config/database");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');
const logger = require("morgan");
const methodOverride = require("method-override");
const flash = require("express-flash");

const homeRoutes = require('./routes/home');
const albumsRoutes = require('./routes/albums');
const artistsRoutes = require('./routes/artists');
const lyricsRoutes = require('./routes/lyrics');
const songsRoutes = require('./routes/songs');


//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Static Folder
app.use(express.static("public"));

//Using EJS for views
app.set("view engine", "ejs");

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup Sessions - stored in MongoDB
app.use(session({
    secret: 'keyboard cat',
    resave: false, // don't save session if nothing is changed 
    saveUninitialized: false, // don't create a session until something is stored
    store: MongoStore.create({
        mongoUrl: process.env.DB_STRING,
        mongooseConnection: mongoose.connection,
      })
    })
)

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

app.use("/", homeRoutes);
app.use("/albums", albumsRoutes);
app.use("/artists", artistsRoutes);
app.use("/songs", songsRoutes);
app.use("/lyrics", lyricsRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
})