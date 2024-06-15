const express = require('express');
const router = express.Router();
const MenuItem = require('.././models/menuItem');

// Route to handle POST requests for adding a new menu item
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        // Creating a new instance of MenuItem model
        const newMenuItem = new MenuItem(data);
        // Saving the new menu item to the database
        const response = await newMenuItem.save();
        // Sending a successful response
        console.log('Data saved:', response);
        res.status(200).json(response);  
    } catch (err) {
        // Handling errors and sending an error response
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to handle GET requests for fetching all menu items
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('Data fetched:', data);
        res.status(200).json(data);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to handle GET requests for fetching persons by work type
router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;
        if (taste === 'spicy' || taste === 'sweet' ||taste === 'sour') {
            const response = await MenuItem.find({ taste: taste });
            console.log('Data fetched:', response);
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const MenuItemID = req.params.id;
        const updateMenuItemData = req.body;

        const response = await MenuItem.findByIdAndUpdate(MenuItemID, updateMenuItemData, { 
            new: true,
            runValidators: true,
        });
        if (!response) {
            return res.status(404).json({ error: 'menuItem Id is not present' });
        }
        console.log('data updated');
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const MenuItemID = req.params.id.trim(); // Trim the ID to remove whitespace and newline characters
        const response = await MenuItem.findByIdAndDelete(MenuItemID);
        if (!response) {
            return res.status(404).json({ error: 'Person Id is not present' });
        }
        console.log('data deleted');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})


module.exports = router;