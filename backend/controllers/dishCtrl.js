const getClientAndDb = async () => {
    const client = await MongoClient.connect(uri);
    const db = client.db('foodrush');
    const dish = db.collection('dish');
    return { client, dish };
}; 


const addDish = async (req, res) => {
    const { client, dish } = await getClientAndDb();

    try {
        const result = await dish.insertOne(req.body);
         res.status(200).json({ success: true, message: 'Dish added successfully' });
        
         
    } catch (error) {
        console.error('Error adding dish:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    } finally { 
        client.close();
     }
};



const getDish = async (req, res) => {
    const { client, dish } = await getClientAndDb();

    try {
        const results = await dish.find({}).toArray();
        res.status(200).json({ success: true, data: results });
    } catch (err) {
        res.status(500).json({ success: false });
    } finally {
        client.close();
    }
};

const updateDish = async (req, res) => {
    const { client, dish } = await getClientAndDb();
    const dishId = req.params.id;
    const objectIdDishId = new ObjectId(dishId);

    try {
        const updatedDish = await dish.findOneAndUpdate(
            { _id: objectIdDishId },
            { $set: req.body },
            { returnDocument: 'after' }
        );
        res.json({ success: true, updateDish });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    } finally {
        client.close();
    }
};

const deleteDish = async (req, res) => {
    const { client, dish } = await getClientAndDb();
    const dishId = req.params.id;
    const objectIdDishId = new ObjectId(dishId);

    try {
        const result = await dish.deleteOne({ _id: objectIdDishId });

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
    addDish,
    getDish,
    updateDish,
    deleteDish,
};
