const express = require('express');
const router = express.Router();
const Person = require('../models/person');

// Route to handle POST requests for creating a new person
router.post('/', async (req, res) => {
    try {
        const data = req.body;

        // Creating a new instance of Person model
        const newPerson = new Person(data);

        // Saving the new person to the database
        const response = await newPerson.save();

        // Sending a successful response with the ID of the newly created person
        console.log('Data saved:', response);
        res.status(200).json({response});  
    } catch (err) {
        // Handling errors and sending an error response
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to handle GET requests for fetching all persons
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data fetched:', data);
        res.status(200).json(data);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to handle GET requests for fetching persons by work type
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
            const response = await Person.find({ work: workType });
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
router.put('/:id', async (req,res)=>{
    try{
    const personID =req.params.id;
    const updatePersonData = req.body;
    
    const response = await Person.findByIdAndUpdate(personID,updatePersonData,{ 
        new: true,
        runValidators: true,
    })
     if(!response){
        return res.status(404).json({error:'Person Id is not persant'});
     }
     console.log('data updated');
     res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal servser error'});
    }

})
router.delete('/:id', async (req, res) => {
    try {
        const personID = req.params.id.trim(); // Trim the ID to remove whitespace and newline characters
        const response = await Person.findByIdAndDelete(personID);
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
