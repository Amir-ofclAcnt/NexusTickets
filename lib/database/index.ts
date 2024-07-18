const MONGODB_URI = process.env.MONGODB_URI;

const { MongoClient } = require("mongodb");

async function connectToDatabase() {
  // Replace the uri string with your MongoDB deployment's connection string.
  const uri = MONGODB_URI; // Replace with your actual connection string
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    const database = client.db(" NEXUSTICKETS"); // Replace with your database name
    console.log("Connected to database");

    // Example: List collections
    const collections = await database.listCollections().toArray();
    console.log("Collections:", collections);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

connectToDatabase().catch(console.error);
