const mongoose = require('mongoose');

// Define MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';

// Connect to MongoDB
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Capture the Mongoose connection
const db = mongoose.connection;

module.exports = db; // Export the Mongoose connection for use in other parts of the application
