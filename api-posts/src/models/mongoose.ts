import mongoose from "mongoose";

const db = mongoose.createConnection(process.env.MONGODB_POSTS_URL as string);

db.once('open', () => {
  console.log('✅ MongoDB connection established to Posts BDD');
});

db.on('error', (err) => {
  console.error(`❌ MongoDB connection error: ${err}}`);
});

export default db;