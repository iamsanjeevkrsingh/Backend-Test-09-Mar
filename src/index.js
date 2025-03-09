require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const githubRoutes = require('./routes/githubRoutes');
const { connectRedis } = require('./config/redisConnect');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the Github API',
        endpoints: {
            getGithubProfile: 'GET /api/github',
            getRepoDetails: 'GET /api/github/:repo-name',
            createIssue: 'POST /api/github/:repo-name/issues'
        }
    });
});

// Routes
app.use('/api/github', githubRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, async () => {
    await connectRedis();
    console.log(`Server is running on port ${PORT}`);
});
