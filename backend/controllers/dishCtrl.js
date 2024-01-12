const getClientAndDb = async () => {
    const client = await MongoClient.connect(uri);
    const db = client.db('foodrush');
    const dish = db.collection('dish');
    return { client, dish };
}; 