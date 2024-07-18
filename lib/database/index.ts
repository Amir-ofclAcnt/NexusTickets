const { MongoClient } = require("mongodb");

async function connectToDatabase() {
  // Replace the uri string with your MongoDB deployment's connection string.
  const uri =
    "mongodb+srv://AmirDB:123123123@cluster0.a1yptao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    const database = client.db("database_name"); // Replace with your database name
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
