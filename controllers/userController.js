const connect = require("../config/db");
const mysql = require("mysql");
const emailValidator = require("deep-email-validator");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { name } = require("ejs");

// Signup Page
const signPage = (req, res) => {
  res.render("index");
};

// Sign up user
const signUser = async (req, res) => {
  // let {
  //     uname,
  //     email,passord
  // }=req.body
  let loginName = req.body.uname;
  let loginEmail = req.body.email;
  let loginPass = req.body.password;
  let pic = req.body.pic;

  // Ecrypt password
  var hashedPass = await bcrypt.hash(loginPass, 10);
  // console.log(req.body);
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

          let sql2 = `INSERT INTO users (name, picture, password, email) VALUES ('${loginName}', '${pic}', '${hashedPass}', '${loginEmail}')`;
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
const loginUser = async (req, res) => {
  let loginEmail = req.body.email;
  let loginPass = req.body.password;

  if (!loginEmail || !loginPass) {
    res.send("Input all credentials please!");
  } else {
    // Validating the email

    // Compare two passwords
    const sql6 = `SELECT password FROM users WHERE email = '${loginEmail}'`;
    connect.query(sql6, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(data);
        const pass = data[0].password;
        // console.log(pass);
        bcrypt.compare(loginPass, pass, (err, result) => {
          if (result) {
            let query = `SELECT * FROM users WHERE email = '${loginEmail}' AND password = '${pass}'`;
            connect.query(query, (err, data) => {
              if (err) {

                console.log(err);
              } else {
                // console.log("no");
                if (data.length == 0) {
                  res.send("Invalid email or password!");
                } else {
                  const loginName = data[0].name;
                  const loginEmail = data[0].email;
                  const loginPass = req.body.password;

                  res.render("dash", { loginName, loginEmail, loginPass });
                }
              }
            });
          }
        });
      }
    });
  }
};

// Update Page
const updatePage = (req, res) => {
  // const query2 = `SELECT * FROM users WHERE email = '${}'`
  res.render("update");
};

// Update the user's credentials
const updateUser = async (req, res) => {


  // Update

  let newName = req.body.name;
  let newEmail = req.body.email;
  let newPass = req.body.pass;
  let cpass = req.body.cpass;
  let oldEmail = req.body.oldEmail;
  let oldPass = req.body.oldPass;

  const query1 = `SELECT * FROM users WHERE email = '${oldEmail}'`;
  connect.query(query1, async (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const pass = data[0].password;
      bcrypt.compare(oldPass, pass, async (err, result) => {
        if (result) {
          if(newPass) {
            const hashed = await bcrypt.hash(newPass, 10);
            let query3 = `UPDATE users SET name = '${newName}', email = '${newEmail}', password = '${hashed}'`
            connect.query(query3, (err) => {
              if(err) {
                console.log(err);
              } else {
                res.send('Updated')
              }
            })
          }
        } else {
          res.send("Please confirm the old password to update!");
          // alert('no')
        }
      });
    }
  });
};


// Delete page
const deletePage = (req, res) => {
  res.render('delete')
}

// Delete account

const deleteAcc = async (req, res) => {
  const email = req.body.email
  const pass = req.body.password

  let query5 = `SELECT password FROM users WHERE email = '${email}'`
  connect.query(query5, async (err, data) => {
    if(err) {
      console.log(err);
    } else {
      console.log(data[0].password);
      const hashed = await bcrypt.hash(pass, 10)
      console.log(hashed);

      
    }
  })



  // if(hashed !== )

  // let query4 = `SELECT * FROM users WHERE email = '${email}' AND password = '${pass}'`
  // connect.query(query4, (err, data) => {
  //   if(err) {
  //     console.log(err);
  //   } else {
      
  //   }
  // })
};

module.exports = {
  signPage,
  signUser,
  loginPage,
  loginUser,
  updatePage,
  updateUser,
  deleteAcc,
  deletePage
  // updated
};
