const express = require('express');
const router = express.Router();
const { getDb } = require('../db/memory');
const { hashPassword, verifyPassword } = require('../lib/hash');
const { validateEmail } = require('../lib/validate');

router.post('/signup', async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body || {};
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({error: "Missing Required Field"})
        }

        const db = getDb();
        const users = db.collection('users');
        const isEmailValid = validateEmail(email);
        if (!isEmailValid) {
            return res.status(400).json({ error: 'Invalid email format. Must be a pmg.com email.' });
        }
        const existingUser = await users.findOne({email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ error: 'User with this email already exists.' });
        }
        const passwordHash = await hashPassword(password);

        const doc = {
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: passwordHash,
            createdAt: new Date()
        }
        const {insertedId} = await users.insertOne({...doc, password: passwordHash});
        res.status(201).json({_id: insertedId, message: `User ${firstName} ${lastName} Account Created Successfully`});

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: 'User with this email already exists.' });
        }
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }

})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body || {};
        if(!email || !password){
            return res.status(400).json({error: "Missing Required Field"})
        }

        const db = getDb();
        const users = db.collection('users');
        
        const existingUser = await users.findOne({email: email.toLowerCase() });
        if (!existingUser) {
            return res.status(401).json({ error: 'Account Does Not Exist' });
        }

        const isPasswordValid = await verifyPassword(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid Password' });
        }

        res.status(200).json({ message: `User ${existingUser.firstName} ${existingUser.lastName} Logged In Successfully` });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: 'User with this email already exists.' });
        }
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }

})


module.exports = router; 