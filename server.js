const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize express app
const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/deltaNumericClub', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Basic Authentication credentials (for simplicity)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password';

function isAuthenticated(req, res, next) {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        next();
    } else {
        res.status(403).json({ message: 'Unauthorized access' });
    }
}

// Middleware to parse JSON and form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// News Schema
const newsSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now }
});
const News = mongoose.model('News', newsSchema);

// Endpoint to add news (Admin only)
app.post('/news', isAuthenticated, (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and Content are required' });
    }

    const newArticle = new News({ title, content });
    newArticle.save()
        .then(() => res.json({ message: 'News article added successfully!' }))
        .catch(err => res.status(500).json({ message: 'Error adding news article', error: err }));
});

// Endpoint to get all news articles
app.get('/news', (req, res) => {
    News.find().sort({ date: -1 })
        .then(news => res.json({ news }))
        .catch(err => res.status(500).json({ message: 'Error fetching news', error: err }));
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});