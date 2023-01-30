const express = require('express')
const route = express.Router()
const { signPage, signUser, updateUser, deleteUser, loginUser, loginPage, login } = require('../controllers/userController')


// Signup Page
route.get('/', signPage)
 


// Signup user
route.post('/dash', signUser)



// Login to dashboard
route.post('/dash1', login)


// Login page
route.get('/login', loginPage)

// Login user
route.post('/loginUser', loginUser)

    // Update specified user
route.put('/:id', updateUser)


    // Delete a specified user
route.delete('/:id', deleteUser)


module.exports = route