// routes/contact.routes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Create a new contact (POST /contacts)
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, reason, message } = req.body;
        const contact = new Contact({ name, email, phone, reason, message });
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all contacts (GET /contacts)
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single contact by ID (GET /contacts/:id)
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a contact by ID (PUT /contacts/:id)
router.put('/:id', async (req, res) => {
    try {
        const { name, email, phone, reason, message } = req.body;
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { name, email, phone, reason, message },
            { new: true, runValidators: true }
        );
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a contact by ID (DELETE /contacts/:id)
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
