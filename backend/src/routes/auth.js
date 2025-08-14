const express = require('express');
const router = express.Router();
const { getDb } = require('../db/memory');

router.post('/signup', async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body || {};
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({error: "Missing Required Field"})
        }

        const db = getDb();
        const users = db.collection('users');

        const existingUser = await users.findOne({email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ error: 'User with this email already exists.' });
        }

        const doc = {
            firstName,
            lastName,
            email: email.toLowerCase(),
            password,
            createdAt: new Date()
        }
        const {insertedId} = await users.insertOne(doc);
        res.status(201).json({_id: insertedId, message: `User ${firstName} ${lastName} Account Created Successfully`});

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: 'User with this email already exists.' });
        }
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }

})

module.exports = router; 