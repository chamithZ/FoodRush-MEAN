const { ObjectId, MongoClient } = require('mongodb');
const uri = process.env.Mongo_URI
// Your database connection logic
const getClientAndDb = async () => {
    const client = await MongoClient.connect(uri);
    const db = client.db('foodrush');
    const restaurant = db.collection('restaurant');
    return { client, restaurant };
};

const addRestaurant = async (req, res) => {
    const { client, restaurant } = await getClientAndDb();

    try {
        const result = await restaurant.insertOne(req.body);
         res.status(200).json({ success: true, message: 'Restaurant added successfully' });
        
        
    } catch (error) {
        console.error('Error adding restaurant:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    } finally {
        client.close();
    }
};





const getRestaurant = async (req, res) => {
    const { client, restaurant } = await getClientAndDb();

    try {
        const results = await restaurant.find({}).toArray();
        res.status(200).json({ success: true, data: results });
    } catch (err) {
        res.status(500).json({ success: false });
    } finally {
        client.close();
    }
};

const updateRestaurant = async (req, res) => {
    const { client, restaurant } = await getClientAndDb();
    const restaurantId = req.params.id;
    const objectIdRestaurantId = new ObjectId(restaurantId);

    try {
        const updatedRestaurant = await restaurant.findOneAndUpdate(
            { _id: objectIdRestaurantId },
            { $set: req.body },
            { returnDocument: 'after' }
        );
        res.json({ success: true, updatedRestaurant });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    } finally {
        client.close();
    }
};

const deleteRestaurant = async (req, res) => {
    const { client, restaurant } = await getClientAndDb();
    const restaurantId = req.params.id;
    const objectIdRestaurantId = new ObjectId(restaurantId);

    try {
        const result = await restaurant.deleteOne({ _id: objectIdRestaurantId });

        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, message: 'deleted' });
        } else {
            res.status(404).json({ success: false, message: 'Restaurant not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    } finally {
        client.close();
    }
};

module.exports = {
    addRestaurant,
    getRestaurant,
    updateRestaurant,
    deleteRestaurant,
};
