const express = require("express");
const route = express.Router();
const {
  signPage,
  signUser,
  loginPage,
  loginUser,
  updatePage,
  updateUser,
  deletePage,
  deleteAcc
} = require("../controllers/userController");

// Signup Page
route.get("/", signPage);

// Signup user
route.post("/", signUser);

// Login page
route.get("/login", loginPage);

// Login user
route.post("/login", loginUser);

// Update Page
route.get('/update', updatePage)


route.post('/update', updateUser)

// Delete page
route.get('/delete', deletePage)

// Delete the account
route.post('/delete', deleteAcc)


module.exports = route;
