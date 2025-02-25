import { createClient } from "redis";

const redisURL = process.env.REDIS_URL;
export const cacheOptions = { EX: 300 };

const redisClient = createClient({ url: redisURL })

redisClient.on('connect', () => {
  console.log('✅ Redis api-posts online !');
});

redisClient.on('error', (error) => {
  console.error('❌ Redis api-posts error:', error);
});

redisClient.connect();

export default redisClient;