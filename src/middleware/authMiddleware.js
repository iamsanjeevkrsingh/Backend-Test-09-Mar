// middleware/authMiddleware.js
const authenticateToken = (req, res, next) => {
  let githubToken = req.headers["x-access-token"]

  if (!githubToken) {
    return res.status(401).json({ message: "GitHub token is required" });
  }

  githubToken = githubToken.split(" ")[1];

  if (githubToken !== process.env.GITHUB_TOKEN) {
    return res.status(401).json({ message: "Invalid GitHub token" });
  }

  // Store the token for use in the controller
  req.githubToken = githubToken;
  next();
};

module.exports = { authenticateToken };
