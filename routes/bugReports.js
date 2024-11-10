const express = require('express');
const BugReport = require('../models/BugReport');

const router = express.Router();

// CREATE a new bug report
router.post('/', async (req, res) => {
  const { name, email, phone, screenshot, description } = req.body;
  try {
    const newBugReport = new BugReport({ name, email, phone, screenshot, description });
    await newBugReport.save();
    res.status(201).json({ message: 'Bug report created successfully', bugReport: newBugReport });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create bug report', details: error.message });
  }
});

// READ all bug reports
// READ all bug reports
router.get('/', async (req, res) => {
  try {
    const bugReports = await BugReport.find().sort({ createdAt: -1 }); // Sort by most recent
    res.json(bugReports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bug reports', details: error.message });
  }
});

// READ a single bug report by ID
router.get('/:id', async (req, res) => {
  try {
    const bugReport = await BugReport.findById(req.params.id);
    if (!bugReport) return res.status(404).json({ error: 'Bug report not found' });
    res.json(bugReport);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bug report', details: error.message });
  }
});

// UPDATE a bug report by ID
router.put('/:id', async (req, res) => {
  const { name, email, phone, screenshot, description } = req.body;
  try {
    const updatedBugReport = await BugReport.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, screenshot, description, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!updatedBugReport) return res.status(404).json({ error: 'Bug report not found' });
    res.json({ message: 'Bug report updated successfully', bugReport: updatedBugReport });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update bug report', details: error.message });
  }
});

// DELETE a bug report by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBugReport = await BugReport.findByIdAndDelete(req.params.id);
    if (!deletedBugReport) return res.status(404).json({ error: 'Bug report not found' });
    res.json({ message: 'Bug report deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete bug report', details: error.message });
  }
});

module.exports = router;