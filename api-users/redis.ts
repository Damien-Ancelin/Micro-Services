import { createClient } from "redis";

const redisURL = process.env.REDIS_URL;
export const cacheOptions = { EX: 60 };

const redisClient = createClient({ url: redisURL })

redisClient.on('connect', () => {
  console.log('✅ Redis api-users online !');
});

redisClient.on('error', (error) => {
  console.error('❌ Redis api-users error:', error);
});

redisClient.connect();

export default redisClient;