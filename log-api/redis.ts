import { createClient } from "redis";
const redisUrl = process.env.REDIS_URL as string;
export const redisClient = createClient({ url: redisUrl });

redisClient.on('connect', () => {
  console.log('✅ Redis logger online !');
});

redisClient.on('error', (error) => {
  console.error('❌ Redis logger error:', error);
});

export default redisClient;