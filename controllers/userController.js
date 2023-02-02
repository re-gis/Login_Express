const connect = require("../config/db");
const mysql = require("mysql");
const emailValidator = require("deep-email-validator");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { name } = require("ejs");

// Signup Page
const signPage = (req, res) => {
  res.render("index");
};

// Sign up user
const signUser = (req, res) => {
  let loginName = req.body.uname;
  let loginEmail = req.body.email;
  let loginPass = req.body.password;
  let pic = req.body.pic;

  // Ecrypt password
  // const salt = bcrypt.genSalt(10);
  // const hashedPass = bcrypt.hash(pass, salt)

  if (!loginName || !loginEmail || !loginPass) {
    res.send("Input all credentials!");
  } else {
    // Check if email already exists

    let sql = `SELECT * FROM users WHERE email = '${loginEmail}'`;
    connect.query(sql, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data.length == 0) {
          // Save the user in the database

          let sql2 = `INSERT INTO users (name, picture, password, email) VALUES ('${loginName}', '${pic}', '${loginPass}', '${loginEmail}')`;
          connect.query(sql2, (err) => {
            if (err) {
              console.log(err);
            } else {
              res.render("dash", { loginName, loginEmail, loginPass });
            }
          });
        } else {
          res.send("Email already exists!");
        }
      }
    });
  }
};

// Login Page

const loginPage = (req, res) => {
  res.render("login");
};

// Login user
const loginUser = (req, res) => {
  let loginEmail = req.body.email;
  let loginPass = req.body.password;

  if (!loginEmail || !loginPass) {
    res.send("Input all credentials please!");
  } else {
    // Validating the email

    let query = `SELECT * FROM users WHERE email = '${loginEmail}' AND password = '${loginPass}'`;
    connect.query(query, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data.length == 0) {
          res.send("Invalid email or password!");
        } else {
          const loginName = data[0].name;
          const loginEmail = data[0].email;
          const loginPass = data[0].password;

          res.render("dash", { loginName, loginEmail, loginPass });
        }
      }
    });
  }
};

// Update Page
const updatePage = (req, res) => {
  res.render("update");
};



module.exports = {
  signPage,
  signUser,
  loginPage,
  loginUser,
  updatePage,
};
