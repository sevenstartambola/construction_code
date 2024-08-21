const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tambola",

  // :::::::::::::::::::::::::::: for production uncomment for production
  // host: "localhost",
  // user: "tambola",
  // password: "tambola@123#",
  // database: "sevenstartambola",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = { con };
