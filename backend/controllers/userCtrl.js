const { ObjectId, MongoClient } = require('mongodb');
const uri = process.env.Mongo_URI
// Your database connection logic
const getClientAndDb = async () => {
    const client = await MongoClient.connect(uri);
    const db = client.db('foodrush');
    const user = db.collection('user');
    return { client, user };
}; 
const addUser = async (req, res) => {
    const { client, user } = await getClientAndDb();

    try {
        const result = await user.insertOne(req.body);
         res.status(200).json({ success: true, message: 'User added successfully' });
        
        
    } catch (error) {
        console.error('Error adding restaurant:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    } finally {
        client.close();
    }
};


const getUser = async (req, res) => {
    const { client, user } = await getClientAndDb();

    try {
        const results = await user.find({}).toArray();
        res.status(200).json({ success: true, data: results });
    } catch (err) {
        res.status(500).json({ success: false });
    } finally {
        client.close();
    }
};

const updateUser = async (req, res) => {
    const { client, user } = await getClientAndDb();
    const userId = req.params.id;
    const objectIdRestaurantId = new ObjectId(userId);

    try {
        const updatedUser = await restaurant.findOneAndUpdate(
            { _id: objectIdRestaurantId },
            { $set: req.body },
            { returnDocument: 'after' }
        );
        res.json({ success: true, updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    } finally {
        client.close();
    }
};

const deleteUser = async (req, res) => {
    const { client, user } = await getClientAndDb();
    const userId = req.params.id;
    const objectIdRestaurantId = new ObjectId(userId);

    try {
        const result = await user.deleteOne({ _id: objectIdRestaurantId });

        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, message: 'deleted' });
        } else {
            res.status(404).json({ success: false, message: 'user not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    } finally {
        client.close();
    }
};

module.exports = {
    addUser,
    getUser,
    updateUser,
    deleteUser,
};