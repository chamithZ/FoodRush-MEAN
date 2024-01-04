const { ObjectId, MongoClient } = require('mongodb');
const uri = process.env.Mongo_URI
// Your database connection logic
const getClientAndDb = async () => {
    const client = await MongoClient.connect(uri);
    const db = client.db('foodrush');
    const user = db.collection('user');
    return { client, user };
}; 