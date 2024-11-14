// routes/bookRequest.js
const express = require('express');
const router = express.Router();
const BookRequest = require('../models/BookRequest');

// Create a new book request
router.post('/', async (req, res) => {
  try {
    const bookRequest = new BookRequest(req.body);
    await bookRequest.save();
    res.status(201).json(bookRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all book requests
router.get('/', async (req, res) => {
  try {
    const bookRequests = await BookRequest.find();
    res.json(bookRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific book request by ID
router.get('/:id', async (req, res) => {
  try {
    const bookRequest = await BookRequest.findById(req.params.id);
    if (!bookRequest) return res.status(404).json({ message: 'Request not found' });
    res.json(bookRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a book request by ID
router.put('/:id', async (req, res) => {
  try {
    const bookRequest = await BookRequest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bookRequest) return res.status(404).json({ message: 'Request not found' });
    res.json(bookRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a book request by ID
router.delete('/:id', async (req, res) => {
  try {
    const bookRequest = await BookRequest.findByIdAndDelete(req.params.id);
    if (!bookRequest) return res.status(404).json({ message: 'Request not found' });
    res.json({ message: 'Request deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
