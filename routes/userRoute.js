const express = require('express')
const route = express.Router()
const { getUsers, signUser, updateUser, deleteUser } = require('../controllers/userController')

    // Get users
route.get('/sign', getUsers)

    // Signup
route.get('/', signUser)


    // Update specified user
route.put('/:id', updateUser)


    // Delete a specified user
route.delete('/:id', deleteUser)


module.exports = route