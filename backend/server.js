const express = require("express");
const cors = require('cors'); // Import the cors middleware

const app = express();

const dbConfig = require('./db');
const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');

// Enable CORS for all routes
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Define your API routes
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);

// Set up the port for your server
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => console.log(`Node server started using nodemon. Listening on port ${port}`));
