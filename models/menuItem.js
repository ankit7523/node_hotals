const mongoose = require('mongoose');

// Define the schema for menu items
const menuItemschema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // The name of the item is required
    },
    price: {
        type: Number,
        required: true, // The price of the item is required
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'], // The taste must be one of these options
        required: true, // The taste of the item is required
    },
    is_drink: {
        type: Boolean,
        default: false, // By default, the item is not a drink
    },
    ingredients: {
        type: [String], // The ingredients are stored as an array of strings
        default: [], // By default, the item has no ingredients
    },
    num_sales: {
        type: Number,
        default: 0, // By default, the number of sales is 0
    }
});

// Create a model based on the schema
const MenuItem = mongoose.model('MenuItem', menuItemschema);

module.exports = MenuItem; // Export the model for use in other files
