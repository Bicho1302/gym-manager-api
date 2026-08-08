const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

let database;

async function connectDB() {
  try {
    await client.connect();
    database = client.db();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
}

function getDB() {
  if (!database) {
    throw new Error('Database not initialized');
  }

  return database;
}

module.exports = {
  connectDB,
  getDB
};