const mongoose = require("mongoose");

// Update the connection URL with the database name
var mongoURL = 'mongodb+srv://alomj257:alomj257@cluster0.eesendj.mongodb.net/mern-rooms';

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on('error', () => {
    console.log('Mongo DB connection failed');
});

connection.on('connected', () => {
    console.log('Mongo DB connected successfully');
});

module.exports = mongoose;