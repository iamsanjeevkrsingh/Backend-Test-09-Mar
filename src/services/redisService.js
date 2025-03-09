const { redisClient } = require('../config/redisConnect');

const getCache = async (key) => {
  try {
    const cachedData = await redisClient.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.error('Redis get error:', error);
    return null;
  }
};

const setCache = async (key, data, expireTime = 3600) => {
  try {
    await redisClient.set(key, JSON.stringify(data), {
      EX: expireTime
    });
    return true;
  } catch (error) {
    console.error('Redis set error:', error);
    return false;
  }
};


const deleteCache = async (key) => {
  try {
    await redisClient.del(key);
    return true;
  } catch (error) {
    console.error('Redis delete error:', error);
    return false;
  }
};

const deleteCacheByPattern = async (pattern) => {
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
    return true;
  } catch (error) {
    console.error('Redis delete pattern error:', error);
    return false;
  }
};

module.exports = {
  getCache,
  setCache,
  deleteCache,
  deleteCacheByPattern
}; 