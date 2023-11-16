const express = require('express')
const router = express.Router()
const UserModel = require('../models/users')
const mongoose = require('mongoose')
const registerController = require('../controllers/registerControllers')
const auth = require('../middleware/json controller')

router.post('/',  registerController.createData)

router.get('/', registerController.getAllData)

router.post('/editUser',registerController.editUserRoute)

router.post('/update/:id', registerController.updateUser)

router.delete('/delete', registerController.deleteUser)

router.get('/getAllUsers', registerController.getAllUsers);

module.exports=router