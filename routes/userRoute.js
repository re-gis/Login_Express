const express = require("express");
const route = express.Router();
const {
  signPage,
  signUser,
  loginPage,
  loginUser,
  updatePage,
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
module.exports = route;
