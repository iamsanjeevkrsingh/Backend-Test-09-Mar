const axios = require("axios");
const dotenv = require("dotenv");
const { getCache, setCache } = require('../services/redisService');

dotenv.config();


const githubApi = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
    }
});

// Get github user details
const getGithubProfile = async (req, res) => {
    try {

        const cacheKey = `github:${process.env.GITHUB_USERNAME}`;
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            return res.json(cachedData);
        }

        const [userResponse, reposResponse] = await Promise.all([
            githubApi.get(`/users/${process.env.GITHUB_USERNAME}`),
            githubApi.get(`/users/${process.env.GITHUB_USERNAME}/repos`)
        ]);

        const userData = {
            followers: userResponse.data.followers,
            following: userResponse.data.following,
            public_repos: userResponse.data.public_repos,
            repositories: reposResponse.data.map(repo => ({
                name: repo.name,
                description: repo.description,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                url: repo.html_url
            }))
        };

        await setCache(cacheKey, userData, 900);

        res.json(userData);
    } catch (error) {
        console.error('GitHub API Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch GitHub data' });
    }
};

// Get a single repo details
const getRepoDetails = async (req, res) => {
    try {
        const { repoName } = req.params;
        const cacheKey = `github:${process.env.GITHUB_USERNAME}:${repoName}`;
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            return res.json(cachedData);
        }

        const repoResponse = await githubApi.get(
            `/repos/${process.env.GITHUB_USERNAME}/${repoName}`
        );

        const repoData = {
            name: repoResponse.data.name,
            description: repoResponse.data.description,
            stars: repoResponse.data.stargazers_count,
            forks: repoResponse.data.forks_count,
            open_issues: repoResponse.data.open_issues_count,
            language: repoResponse.data.language,
            created_at: repoResponse.data.created_at,
            updated_at: repoResponse.data.updated_at,
            url: repoResponse.data.html_url
        };

        await setCache(cacheKey, repoData, 900);

        res.json(repoData);
    } catch (error) {
        console.error('GitHub API Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to get the repo details' });
    }
};

// Get all issues of a repo
const createIssue = async (req, res) => {
    try {
        const { repoName } = req.params;
        const { title, body } = req.body;

        if (!title || !body) {
            return res.status(400).json({ 
                error: 'Title and body are required' 
            });
        }

        const response = await githubApi.post(
            `/repos/${process.env.GITHUB_USERNAME}/${repoName}/issues`,
            { title, body }
        );

        res.json({
            message: 'Issue created successfully',
            issue_url: response.data.html_url
        });
    } catch (error) {
        console.error('GitHub API Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to create issue' });
    }
};

module.exports = {
  getGithubProfile,
  getRepoDetails,
  createIssue,
};
