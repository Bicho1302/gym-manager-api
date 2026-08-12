const { MongoClient } = require('mongodb');

let client;
let database;

async function connectDB() {
  try {
    if (database) {
      return database;
    }

    client = new MongoClient(process.env.MONGODB_URI);

    await client.connect();
    database = client.db();

    console.log('Connected to MongoDB');

    return database;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error;
  }
}

function getDB() {
  if (!database) {
    throw new Error('Database not initialized');
  }

  return database;
}

async function closeDB() {
  if (client) {
    await client.close();
    client = null;
    database = null;
  }
}

module.exports = {
  connectDB,
  getDB,
  closeDB
};