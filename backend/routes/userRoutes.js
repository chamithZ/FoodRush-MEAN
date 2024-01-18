const express = require('express');
const router = express.Router();
const userController = require('../controllers/userCtrl');

router.post('/adduser', userController.addUser);  
router.get('/getuser', userController.getUser);
router.put('/updateuser/:id', userController.updateUser);
router.delete('/deleteuser/:id', userController.deleteUser);

module.exports = router;
