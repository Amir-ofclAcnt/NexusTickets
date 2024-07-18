require("dotenv").config();
const uri = process.env.MONGODB_URI;

const { MongoClient } = require("mongodb");

async function connectToDatabase() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to database");
    // Perform database operations here
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

connectToDatabase().catch(console.error);
