const express = require('express');
const router = express.Router();
const {
    getGithubProfile,
    getRepoDetails,
    createIssue
} = require('../controllers/githubController');
const { authenticateToken } = require('../middleware/authMiddleware');

//Get github profile
router.get('/', authenticateToken, getGithubProfile);

//Get repo details
router.get('/:repoName', authenticateToken, getRepoDetails);

//Create issue for a repo
router.post('/:repoName/issues', authenticateToken, createIssue);

module.exports = router;
