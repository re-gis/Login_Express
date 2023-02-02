const express = require("express");
const conn = require("./config/db");
const ejs = require('ejs')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const colors = require('colors')
const app = express();

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");


// Set cookie and session and also flash
app.use(cookieParser('SecretStringForCookies'))
app.use(session({
  secret: 'SecretStringForSession',
  cookie: { maxAge: 60000 },
  resave: true, 
  saveUninitialized: true 
}))

app.use(flash())



// Routes
app.use("/", require("./routes/userRoute"));

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.cyan.underline);
});
