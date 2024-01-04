const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantCtrl');

router.post('/addrestaurant', restaurantController.addRestaurant);
router.get('/getrestaurant', restaurantController.getRestaurant);
router.put('/updaterestaurant/:id', restaurantController.updateRestaurant);
router.delete('/deleteRestaurant/:id', restaurantController.deleteRestaurant);

module.exports = router;
