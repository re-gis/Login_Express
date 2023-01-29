const express = require("express");
const conn = require("./config/db");
const ejs = require('ejs')
const app = express();

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/userRoute"));

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
