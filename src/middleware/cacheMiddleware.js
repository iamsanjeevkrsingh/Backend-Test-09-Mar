const { getCache, setCache } = require('../services/redisService');

/**
 * Middleware to cache API responses
 * @param {number} duration - Cache duration in seconds
 * @returns {Function} - Express middleware function
 */
const cacheMiddleware = (cacheKey, duration = 3600) => {
  return async (req, res, next) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next();
    }

    try {
      const cachedData = await getCache(cacheKey);
      
      if (cachedData) {
        return res.json(cachedData);
      }
      
      const originalJson = res.json;
      
      res.json = function(data) {
        res.json = originalJson;
        setCache(cacheKey, data, duration);
        return res.json(data);
      };
      
      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};

module.exports = { cacheMiddleware }; 