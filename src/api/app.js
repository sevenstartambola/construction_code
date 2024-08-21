const express = require("express");
// const app = express.Router();
const { con } = require("./sqlConfig/connection");
var bodyParser = require("body-parser");

var app = express();
var cors = require("cors");
const ResponseHandler = require("./utils/responseHelper");
app.use(cors("*"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const ex_query = (sql, req, res, fields) => {
  con.query(
    sql,
    [req.body.userName, req.body.password],
    function (error, result, fields) {
      if (error) throw error;
      console.log(result);
      if (error) {
        res.status(400).send("Error in database operation");
      } else {
        res.send(result);
      }
    }
  );
};

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: website api hide on 03-oct
// app.get('/ticketCardView', async (req, res) => {
//   ex_query("SELECT * FROM tbl_ticket", req, res)
// })

// app.put('/updateTicketStatus', async (req, res)=>{
//   e
// })

app.listen(3003, function () {
  console.log("Server is up and Rudding on port 3000!");
});
