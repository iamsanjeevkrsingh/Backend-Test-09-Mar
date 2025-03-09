# GitHub Repository API Integration

A Node.js backend service that integrates with GitHub API, featuring Redis caching and rate limiting.

## 🔥 Top Development Challenge

The primary challenge in this project was implementing a robust authentication system with proper rate limiting while maintaining high performance through Redis caching. This required careful consideration of:

- GitHub API rate limits (5000 requests/hour)
- Token-based authentication security
- Efficient cache invalidation strategies
- Concurrent request handling

## ⏱️ Development Time Breakdown

| Phase | Time | Percentage | Description |
|-------|------|------------|-------------|
| Initial Setup | 30 min | 17% | Project structure, dependencies, environment setup |
| Core API Integration | 45 min | 25% | GitHub API endpoints, axios implementation |
| Authentication | 30 min | 17% | Token validation, middleware, security |
| Redis Caching | 45 min | 25% | Cache setup, integration, invalidation logic |
| Testing & Optimization | 20 min | 11% | API testing, performance optimization |
| Documentation | 10 min | 5% | README, API docs, comments |

Total Development Time: ~3 hours

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- Redis Server
- GitHub Account & Personal Access Token

### Installation

1. Clone the repository:
```bash
git clone https://github.com/iamsanjeevkrsingh/Backend-Test-Mar-9-2025
cd Backend-Test-Mar-9-2025
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```env
NODE_ENV=development
PORT=3000
GITHUB_USERNAME=your_github_username
GITHUB_TOKEN=your_github_token
REDIS_URL=redis://localhost:6379
```

4. Start the server:
```bash
npm start
```

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Redis** - Caching layer
- **Axios** - HTTP client
- **dotenv** - Environment configuration

## 📌 API Endpoints

### Get GitHub Profile
```http
GET /api/github
Header: x-access-token: Bearer <your-github-token>
```

### Get Repository Details
```http
GET /api/github/:repoName
Header: x-access-token: Bearer <your-github-token>
```

### Create Issue
```http
POST /api/github/:repoName/issues
Header: x-access-token: Bearer <your-github-token>
Body: {
  "title": "Issue title",
  "body": "Issue description"
}
```

## 🔒 Security

- Secure environment variable handling
- Redis connection security

## 💡 Key Features

1. GitHub API Integration
   - Profile information retrieval
   - Repository details fetching
   - Issue creation functionality
   - Error handling and response formatting

2. Redis Caching
   - Efficient data caching with TTL
   - Automatic cache invalidation
   - Performance optimization
   - Cache middleware for reusable caching logic

3. Security
   - Token validation middleware
   - Error handling with appropriate status codes
   - Secure Redis connection

## 📝 Development Steps

1. **Project Initialization**
   - Basic project setup
   - Dependency installation
   - Environment configuration

2. **GitHub API Integration**
   - API endpoint implementation
   - Axios client setup
   - Response handling

3. **Redis Implementation**
   - Connection setup
   - Cache middleware
   - Error handling

4. **Authentication**
   - Token validation
   - Middleware creation
   - Security implementation

5. **Testing & Optimization**
   - Endpoint testing
   - Performance optimization
   - Error handling improvement

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Improvements

1. Add more GitHub API endpoints (stars, forks, pull requests)
2. Implement webhook support for real-time updates
3. Add unit and integration tests
4. Enhance error handling with more detailed messages
5. Add API documentation using Swagger/OpenAPI

## 👨‍💻 Developer Notes

### Challenges Faced
1. **Authentication Implementation**: Created secure token validation system while ensuring good user experience
2. **Cache Invalidation**: Implemented 15-minute TTL with pattern-based invalidation
3. **Error Handling**: Comprehensive handling of various GitHub API response scenarios

### Best Practices Implemented
1. Environment variable usage for sensitive data
2. Middleware for cross-cutting concerns
3. Service layer abstraction
4. Proper error handling
5. Code modularization

### Lessons Learned
1. Always implement caching early in development
2. Proper error handling is crucial for external API dependencies
3. Security should be a primary concern from the start
4. Documentation saves time in the long run
5. Testing with real-world scenarios is essential 