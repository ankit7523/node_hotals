const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db'); // Ensure this path is correct

require('dotenv').config();


// Middleware
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
// Routes
app.get('/', (req, res) => {
    res.send('Welcome to our hotel.');
});

// Import and use router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
