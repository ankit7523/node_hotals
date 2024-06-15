const express = require('express');
const app = express();

// Importing the database connection (Check this path and file)
const db = require('./db');

// Importing and using bodyParser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Routes
app.get('/', function (req, res) {
    res.send('Welcome to our hotel.');
});

// Import the router files 
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');



app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

// Start the Express.js server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {  
    console.log(`Listening on port ${PORT}`);
});
