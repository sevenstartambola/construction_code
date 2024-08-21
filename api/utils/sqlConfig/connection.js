const mysql = require("mysql");

var con = mysql.createConnection({
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "tambola",

  // :::::::::::::::::::::::::::: for production uncomment for production
  host: "localhost",
  user: "Sevenstar",
  password: "Sevenstar#2324",
  database: "tambola",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = { con };
