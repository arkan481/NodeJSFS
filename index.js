const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts.js');
const bodyparser = require('body-parser');
require('dotenv/config');

const app = express();

// Adding a body parser
app.use(bodyparser.json());

// Adding Home Routes
app.get(`/`,(req,res)=> {
    res.send("Hello :)");
});

// Importing Additional Routes
app.use('/posts',postRoutes);

// Connecting to Mongo Atlas (The Database)
mongoose.connect(process.env.DB_CONNECTION || process.env.MONGO_URI,{ useNewUrlParser: true,useUnifiedTopology: true },()=>{
});

// checking if connected
mongoose.connection.on('connected',()=>{
    console.log('mongoose is connected');
});

// Start Listening to the server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> {
    console.log(`Server started on PORT: ${PORT}`);
});