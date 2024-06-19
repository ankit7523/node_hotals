const mongoose = require('mongoose');

require('dotenv').config();

const mongoURL = process.env.MONGODB_URL;
//const mongoURL = process.env.MONGODB_URL_LOCAL;
// Load MongoDB connection URL from environment variables

//const mongoURL =process.env.MONGODB_URL_LOCAL;

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

// Export the Mongoose connection for use in other parts of the application
module.exports = db;
