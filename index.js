// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bugReportRoutes = require('./routes/bugReports');
const contactRoutes = require('./routes/contact');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server after successful database connection
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Sample Route

app.use('/api/bugReports', bugReportRoutes);
app.use('/api/contacts', contactRoutes);

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the backend, connected to MongoDB!' });
});
