var firebase = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://sevenstarttambola-default-rtdb.firebaseio.com",
});

var db = firebase.database();
var ref = db.ref("game");

// var userRef = ref.child('gameSet')

const express = require("express");

// const app = express.Router();
const { con } = require("./utils/sqlConfig/connection");
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
      // console.log(result);
      if (error) {
        res.status(400).send("Error in database operation");
      } else {
        res.send(result);
      }
    }
  );
};

// ::::::::::::::::::::::::::::::::::::::::: admin api code // not working for now let us see at the end
app.post("/adminLogin", async (req, res) => {
  con.query(
    "SELECT * FROM `tbl_admin` Where `admin_username`=? And `admin_password`=?",
    [req.body.username, req.body.password],
    function (error, result, fields) {
      if (error) throw error;
      // console.log(result);
      if (error) {
        ResponseHandler(res, false, "Api issue", result);
      } else {
        if (result.length > 0) {
          ResponseHandler(res, true, "Login Successful", result);
        } else {
          ResponseHandler(res, false, "Login Faild", result);
        }
      }
    }
  );
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //
// ::::::::::::::::::::::::::::::::::::::: || aadmin || :::::::::::::::::::::::::::::::::::::::: //
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// ::::::::::::::::::::::::::::::::::::::::: Agents List //
app.get("/agentsList", async (req, res) => {
  ex_query("SELECT * FROM tbl_agents", req, res);
});

// ::::::::::::::::::::::::::::::::::::::::: Agents Own Details //
app.post("/agentsOwnDetails", async (req, res) => {
  con.query(
    "SELECT * FROM tbl_agents WHERE agents_id=?",
    [req.body.agentId],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Fetch Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Deleted", result);
        }
      }
    }
  );
});

// ::::::::::::::::::::::::::::::::::::::::: Save Agent //
app.post("/saveAgent", async (req, res) => {
  con.query(
    "INSERT INTO `tbl_agents` SET `agents_name`=?, `agents_email`=?, `agents_phone`=?,`agents_password`=?, `agents_gender`=?,`agents_active_status`=?",
    [
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.password,
      req.body.gender,
      req.body.status,
    ],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Save Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Save..", result);
        }
      }
    }
  );
});

// ::::::::::::::::::::::::::::::::::::::::: Edit Agent
app.put("/editAgent", async (req, res) => {
  con.query(
    "UPDATE `tbl_agents` SET  `agents_name`=?, `agents_email`=?, `agents_phone`=?, `agents_gender`=?,`agents_active_status`=?,`agents_status_remarks`=? WHERE `agents_id`=?",
    [
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.gender,
      req.body.status,
      req.body.statusRemarks,
      req.body.id,
    ],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Update Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Update..", result);
        }
      }
    }
  );
});

// ::::::::::::::::::::::::::::::::::::::::: Delete Agent
app.put("/deleteAgent", async (req, res) => {
  con.query(
    "UPDATE `tbl_agents` SET `agents_active_status`=? WHERE `agents_id`=?",
    [req.body.status, req.body.id],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Deleted Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Deleted..", result);
        }
      }
    }
  );
});

app.post("/agentTransactionHistory", async (req, res) => {
  con.query(
    "SELECT * FROM tbl_transection WHERE agents_id",
    [req.body.agentId],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Fetch Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Deleted", result);
        }
      }
    }
  );
});

//:::::::::::::::::::::::::::: amount debit request for admin
app.post("/agentDebitRequest", async (req, res) => {
  con.query(
    "INSERT INTO `tbl_transection` SET `agents_id`=?, `type_cr_dr`=?, `remarks`=?, `amount`=?, `status`=?, `create_at`=?",
    [
      req.body.agentsId,
      req.body.transactionType,
      req.body.agentRequestedRemarks,
      req.body.requestedAmount,
      req.body.status,
      req.body.createdAt,
    ],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Save Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Save..", result);
        }
      }
    }
  );
});

// list of transaction that which agent book how much ticket
app.post("/agentBookTicketAmount", async (req, res) => {
  con.query(
    // "INSERT INTO `tbl_transection` SET `agents_id`=?, `game_id`=?, `type_cr_dr`=?, `remarks`=?, `amount`=?, `status`=?, `create_at`=?",
    "INSERT INTO `tbl_transection` SET `agents_id`=?, `game_id`=?, `type_cr_dr`=?, `remarks`=?, `amount`=?, `status`=?",
    [
      req.body.agentsId,
      req.body.gameId,
      req.body.transactionType,
      req.body.agentRequestedRemarks,
      req.body.requestedAmount,
      req.body.status,
      // req.body.createdAt,
    ],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Save Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Save..", result);
        }
      }
    }
  );
});

app.post("/addMoneyToAgentWallet", async (req, res) => {
  con.query(
    "SELECT `wallet` FROM `tbl_agents` WHERE `agents_id`=?",
    [req.body.agentId],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          const currentWalletBalance = Number(result[0].wallet);
          const requestedAmount = Number(req.body.requestedAmount);
          // Calculate the new wallet balance after adding requestedAmount
          let newWalletBalance = currentWalletBalance + requestedAmount;
          con.query(
            "UPDATE tbl_agents SET `wallet`=? WHERE `agents_id`=?",
            [newWalletBalance, req.body.agentId],
            function (error, result, fields) {
              if (error) throw error;
              if (error) {
                ResponseHandler(res, false, "Api Issue", result);
              } else {
                if (result) {
                  ResponseHandler(res, true, "Update Successfully..", result);
                } else {
                  ResponseHandler(
                    res,
                    false,
                    "Sorry., Unable to Update..",
                    result
                  );
                }
              }
            }
          );
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Deleted", result);
        }
      }
    }
  );
});

app.post("/deductMoneyFromAgentWallet", async (req, res) => {
  con.query(
    "SELECT `wallet` FROM `tbl_agents` WHERE `agents_id`=?",
    [req.body.agentId],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          // console.log("resultresultwewe", result);
          const currentWalletBalance = Number(result[0].wallet);
          const requestedAmount = Number(req.body.requestedAmount);
          // Calculate the new wallet balance after adding requestedAmount
          let newWalletBalance = currentWalletBalance - requestedAmount;
          con.query(
            "UPDATE tbl_agents SET `wallet`=? WHERE `agents_id`=?",
            [newWalletBalance, req.body.agentId],
            function (error, result, fields) {
              if (error) throw error;
              if (error) {
                ResponseHandler(res, false, "Api Issue", result);
              } else {
                if (result) {
                  ResponseHandler(res, true, "Update Successfully..", result);
                } else {
                  ResponseHandler(
                    res,
                    false,
                    "Sorry., Unable to Update..",
                    result
                  );
                }
              }
            }
          );
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Deleted", result);
        }
      }
    }
  );
});

// ::::::::::::::::::::::::::::::::::::::::: Save User
app.post("/saveUser", async (req, res) => {
  con.query(
    "INSERT INTO `tbl_users` SET `users_name`=?, `users_email`=?, `users_phone`=?, `users_gender`=?",
    [req.body.name, req.body.email, req.body.phone, req.body.gender],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Save Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Save..", result);
        }
      }
    }
  );
});

// ::::::::::::::::::::::::::::::::::::::::: Edit User
app.put("/editUser", async (req, res) => {
  con.query(
    "UPDATE `tbl_users` SET  `users_name`=?, `users_email`=?, `users_phone`=?, `users_gender`=? WHERE `users_id`=?",
    [
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.gender,
      req.body.id,
    ],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Update Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Update..", result);
        }
      }
    }
  );
});

// ::::::::::::::::::::::::::::::::::::::::: Delete User
app.put("/deleteUser", async (req, res) => {
  con.query(
    "UPDATE `tbl_users` SET `users_active_status`=? WHERE `users_id`=?",
    [req.body.status, req.body.id],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Deleted Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Deleted", result);
        }
      }
    }
  );
});

// ::::::::::::::::::::::::::::::::::::::::: Tickets List // this api because dynamic ticket created when game created
// app.get('/gameList', async (req, res) => {
//   ex_query("SELECT * FROM tbl_game", req, res)
// })

app.post("/ticketList", async (req, res) => {
  con.query(
    "SELECT * FROM tbl_game WHERE game_id=?",
    [req.body.gameId],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Fetch Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Deleted", result);
        }
      }
    }
  );
});

// ::::::::::::::::::::::::::::::::::::::::: Tickets Card View according to created Game id
app.post("/ticketCardView", async (req, res) => {
  con.query(
    "SELECT * FROM `tbl_game` WHERE `game_id`=?",
    [req.body.gameId],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Deleted", result);
        }
      }
    }
  );
});

app.get("/gameList", async (req, res) => {
  // const limit = req.query.limit || 5; // Default limit is 10, but you can change it based on your requirements
  // const query = `SELECT * FROM tbl_game LIMIT ${limit}`;
  // ex_query(query, req, res);
  ex_query("SELECT * FROM tbl_game", req, res);
});

// app.post("/gameList", async (req, res) => {
//   con.query(
//     "SELECT * FROM tbl_game Limit ?, ?",
//     [req.body.min, req.body.max],
//     function (error, result, fields) {
//       if (error) throw error;
//       if (error) {
//         ResponseHandler(res, false, "Api Issue", result);
//       } else {
//         if (result) {
//           ResponseHandler(res, true, "Fetch Successfully..", result);
//         } else {
//           ResponseHandler(res, false, "Sorry., Unable to Deleted", result);
//         }
//       }
//     }
//   );
// });
// testing

// ::::::::::::::::::::::::::::::::::::::::: Save Game
// function generateTambolaTicket() {
//   // Initialize an empty ticket
//   const numberArr = [];
//   const ticket = [];
//   // Generate three rows with nine numbers each
//   for (let i = 0; i < 3; i++) {
//     const row = [];
//     // Generate nine unique random numbers for each row
//     while (row.length < 9) {
//       let randomNumber = getRandomNumber(1, 90, row);
//       console.log("randomNumberrr", randomNumber);
//       if (!JSON.stringify(row).includes(randomNumber)) {
//         row.push({
//           status: false,
//           number: randomNumber,
//           line: i == 0 ? "top" : i == 1 ? "middle" : "bottom",
//         });
//       }
//     }
//     let arr = [];
//     while (arr.length < 4) {
//       var r = Math.floor(Math.random() * 8) + 1;
//       if (arr.indexOf(r) === -1) arr.push(r);
//     }
//     for (let i = 0; i < arr.length; i++) {
//       row[arr[i]].number = 0; // if zero box should be blank, i have set here as a string but error on json
//     }
//     ticket.push(row);
//     for (let j = 0; j < 9; j++) {
//       numberArr.push(ticket[i][j]);
//     }
//   }
//   return numberArr;
// }

// ::::::::::::::::::::::::::::::::::::::::: Save Game new code

const generateTambolaTicket = () => {
  const minNumber = 1;
  const maxNumber = 90;
  const numbersPerRow = 9;
  const rows = 3;

  // Create an array of all possible numbers
  const allNumbers = Array.from(
    { length: maxNumber - minNumber + 1 },
    (_, index) => index + minNumber
  );

  // Shuffle the numbers randomly
  const shuffledNumbers = shuffleArray(allNumbers);

  // Generate the ticket by selecting the first 27 shuffled numbers
  const ticketNumbers = shuffledNumbers.slice(0, numbersPerRow * rows);
  return ticketNumbers;
  //  this.setState({ ticketNumbers });
};

// Function to shuffle an array randomly
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateTambolaTicketIndex = (minNumber, maxNumber) => {
  const numbersPerRow = 9;
  const rows = 3;
  // Create an array of all possible numbers
  const allNumbers = Array.from(
    { length: maxNumber - minNumber + 1 },
    (_, index) => index + minNumber
  );

  // Shuffle the numbers randomly
  const shuffledNumbers = shuffleArray(allNumbers);

  // Generate the ticket by selecting the first 27 shuffled numbers
  const ticketNumbers = shuffledNumbers.slice(0, numbersPerRow * rows);
  return ticketNumbers;
  //  this.setState({ ticketNumbers });
};

function getRandomValuesFromArray(arr, numValues) {
  const shuffled = arr.slice(); // Clone the original array to avoid modifying it.
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Shuffle the array
  }
  return shuffled.slice(0, numValues);
}

const rowSet = (allNum, min, max, arr, line) => {
  let zeroIndexArr = getRandomValuesFromArray([0, 1, 2, 3, 4, 5, 6, 7, 8], 4);
  let ticketSet = [];
  let ticket = [];

  for (let i = min; i < max; i++) {
    ticket.push(allNum[i]);
  }

  for (let j = 0; j < zeroIndexArr.length; j++) {
    ticket[zeroIndexArr[j]] = 0;
  }
  console.log(ticket);
  for (let i = 0; i < ticket.length; i++) {
    ticketSet.push({
      status: false,
      number: ticket[i],
      line: line,
    });
  }
  return ticketSet;
};

const finalTicketSet = () => {
  let allNum = generateTambolaTicket();
  let allTic = [
    ...rowSet(allNum, 0, 9, [1, 2, 3, 4, 5, 6, 7, 8, 9], "top"),
    ...rowSet(allNum, 9, 18, [10, 11, 12, 13, 14, 15, 16, 17, 18], "middle"),
    ...rowSet(allNum, 18, 27, [19, 20, 21, 22, 23, 24, 25, 26, 27], "bottom"),
  ];
  return allTic;
};

app.post("/saveGame", async (req, res) => {
  let gameId = "";
  con.query(
    "SELECT * FROM tbl_game",
    [req.body.userName, req.body.password],
    function (error, result, fields) {
      if (error) throw error;
      let resultLength = result.length;
      gameId = result[resultLength - 1].game_id + 1;
      let mainArr = [];
      for (i = 1; i <= req.body.gameMaximumTicketSell; i++) {
        let jsonset = {
          id: i,
          gameId: gameId,
          agentId: "",
          userName: "",
          userPhone: "",
          ticketUniquieId: gameId + "" + i + new Date().getTime(),
          bookingDateAndTime: new Date().getTime(),
          winnerTag: "",
          winnerPrize: "",
          dateSet: finalTicketSet(),
        };
        mainArr.push(jsonset);
      }
      const numbersWithStatus = Array.from({ length: 90 }, (_, i) => ({
        number: i + 1,
        status: "false",
      }));
      const numberSetJsonString = JSON.stringify(numbersWithStatus, null, 2); // The third argument is for pretty formatting (2 spaces for indentation)
      con.query(
        "INSERT INTO `tbl_game` SET `game_name`=?, `game_start_date`=?, `game_start_time`=?, `game_maximum_ticket_sell`=?, `game_number_set`=?, `game_amount`=?, `game_amount_per_ticket_to_agent`=?, `game_quick_fire`=?, `quick_seven_prize`=?, `game_top_line`=?, `top_line_prize`=?, `game_middle_line`=?, `middle_line_prize`=?, `game_bottom_line`=?, `bottom_line_prize`=?, `game_housefull`=?, `first_full_house_prize`=?, `gameSecondHousefull`=?, `second_full_house_prize`=?, `game_status`=?,`ticket_set`=?",
        [
          req.body.gameName,
          req.body.gameStartDate,
          req.body.gameStartTime,
          req.body.gameMaximumTicketSell,
          numberSetJsonString.toString(),
          req.body.gameAmount,
          req.body.gameAmountPerTicketToAgent,
          req.body.gameQuickFire,
          req.body.gameQuickSevenPrize,
          req.body.gameTopLine,
          req.body.gameTopLinePrize,
          req.body.gameMiddleLine,
          req.body.gameMiddleLinePrize,
          req.body.gameBottomLine,
          req.body.gameBottomLinePrize,
          req.body.gameHousefull,
          req.body.gameHouseFullPrize,
          req.body.gameSecondHousefull,
          req.body.gameSecondHouseFullPrize,
          req.body.gameStatus,
          JSON.stringify(mainArr),
        ],
        function (error, result, fields) {
          if (error) throw error;
          if (error) {
            ResponseHandler(res, false, "Api Issue", result);
          } else {
            if (result) {
              ResponseHandler(res, true, "Save Successfully..", result);
            } else {
              ResponseHandler(res, false, "Sorry., Unable to Save..", result);
            }
          }
        }
      );
    }
  );
});

// ::::::::::::::::::::::::::::::::::::::::: Get Number For Calling
// app.get("/getNumberOneToHundredForCalling", async (req, res) => {
//   ex_query("SELECT * FROM `tbl_game` WHERE `game_id`=10", req, res);
// });

app.post("/getNumberToSpeak", async (req, res) => {
  con.query(
    "SELECT * FROM `tbl_number_calling` WHERE `number_calling_id`=?",
    [req.body.number],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Save Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Save..", result);
        }
      }
    }
  );
});

// ::::::::::::::::::::::::::::::::::::::::: Matched Ticket For Booking(calling this api to start game)
app.post("/matchedTicketForBooking", async (req, res) => {
  // con.query(
  //   "UPDATE `tbl_game` SET `game_status`='Game Live' WHERE `game_id`=?",
  //   [gameIdVar]
  // );
  let quickSevenAssigned = false;
  let topLineAssigned = false;
  let middleLineAssigned = false;
  let bottomLineAssigned = false;
  let fullHouseCount = 0;
  const currentDate = new Date();

  // Extracting Date Components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();

  // Extracting Time Components
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const milliseconds = currentDate.getMilliseconds();

  const fullDate = `${year}-${month > 9 ? month : `0` + month}-${
    day > 9 ? day : `0` + day
  }`;
  const fullTime = `${hours}:${minutes}`;
  console.log("Date & Time:", fullDate, fullTime);
  con.query(
    "SELECT `game_id`,`game_number_set`,`ticket_set` FROM `tbl_game` WHERE game_start_date=? AND game_start_time < ? AND game_id=?",
    [fullDate, fullTime, req.body.gameId],
    function (error, result, fields) {
      if (error) throw error;
      console.log("ppppw", result);
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else { 
        if (result) {
          console.log("qqqwwwsessw", result);
          console.log("qqqwwwseee", result[0].game_number_set);
          let numberData = JSON.parse(result[0].game_number_set);
          let ticketData = JSON.parse(result[0].ticket_set);
          // let ticketData = JSON.stringify(result[0].ticket_set)
          console.log("ticketDataaaa", ticketData);
          // let numberData = JSON.stringify(result[0].game_number_set);
          let gameIdVar = result[0].game_id;
          console.log("qqqwwwq", numberData);
          console.log("gameIdVarrr", gameIdVar);
          function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }
          // Array to store unique random numbers
          const uniqueRandomNumbers = [];
          // Function to generate and log unique random numbers
          let randomNumber;
          async function generateUniqueRandomNumber() {
            if (uniqueRandomNumbers.length < 90) {
              do {
                randomNumber = getRandomNumber(1, 90);
              } while (uniqueRandomNumbers.includes(randomNumber));
              uniqueRandomNumbers.push(randomNumber);
              console.log(randomNumber);
              numberData?.map((item, index) => {
                if (item.number == randomNumber) {
                  console.log("randomif", item.number, randomNumber);
                  numberData[index].status = "true";
                }
                // newly add code on 05-12
                if (numberData[index].status == "true") {
                  con.query(
                    "UPDATE `tbl_game` SET `game_status`='Game Over' WHERE `game_id`=?",
                    [gameIdVar]
                  );
                } else {
                  con.query(
                    "UPDATE `tbl_game` SET `game_status`='Active' WHERE `game_id`=?",
                    [gameIdVar]
                  );
                }
              }); 

              ticketData?.map((ticketDataItem, ticketDataIndex) => {
                console.log("ticketDataItemmmm", ticketDataItem);
                if (ticketDataItem.userName != "") {
                  if (ticketDataItem.winnerTag == "quick_seven") {
                    quickSevenAssigned = true;
                  }
                  if (ticketDataItem.winnerTag == "top_line") {
                    topLineAssigned = true;
                  }
                  if (ticketDataItem.winnerTag == "middle_line") {
                    middleLineAssigned = true;
                  }
                  if (ticketDataItem.winnerTag == "bottom_line") {
                    bottomLineAssigned = true;
                  }
                }
              });

              ticketData?.map((ticketDataItem, ticketDataIndex) => {
                console.log("ticketDataItemmm", ticketDataItem);
                if (ticketDataItem.winnerTag == "" && ticketDataItem.userName !="") { // && ticketDataItem.userName !="" added on 30-01
                  let quickSevenNumber = 0;
                  let topLineNumber = 0;
                  let middleLineNumber = 0;
                  let bottomLineNumber = 0;
                  let firstFullHouseNumber = 0;
                  let secondFullHouseNumber = 0;
                  ticketDataItem?.dateSet?.map((dateSetItem, dateSetIndex) => {
                    // console.log("dateSetItemmm", dateSetItem);
                    // console.log("randomNumberrr", dateSetItem, randomNumber, quickSevenAssigned);
                    if (dateSetItem.number == randomNumber) {
                      ticketData[ticketDataIndex].dateSet[
                        dateSetIndex
                      ].status = true;
                    }
                    if (quickSevenAssigned == false) {
                      if (dateSetItem.status) {
                        quickSevenNumber = quickSevenNumber + 1;
                        // console.log("randomNumbessrrr", quickSevenAssigned, quickSevenNumber);
                        if (quickSevenNumber == 7) {
                          // let winnerPrizeVar = await getWinnerPrize(gameIdVar, "quick_seven_prize")
                          // console.log("quick_seven_prizeee", getWinnerPrize(gameIdVar, "quick_seven_prize"));
                          ticketDataItem.winnerTag = "quick_seven";
                          // ticketDataItem.winnerPrize = getWinnerPrize(gameIdVar, "quick_seven_prize")
                          ticketDataItem.winnerPrize = "";
                          quickSevenAssigned = true;
                        }
                      }
                    }
                    if (topLineAssigned == false) {
                      if (
                        dateSetItem.status == true &&
                        dateSetItem.line == "top"
                      ) {
                        topLineNumber = topLineNumber + 1;
                      }
                      if (
                        topLineNumber == 5 &&
                        dateSetItem.status == true &&
                        dateSetItem.line == "top"
                      ) {
                        ticketDataItem.winnerTag = "top_line";
                        // ticketDataItem.winnerPrize = getWinnerPrize(gameIdVar, "top_line")
                        ticketDataItem.winnerPrize = "";
                        topLineAssigned = true;
                      }
                    }
                    if (middleLineAssigned == false) {
                      if (
                        dateSetItem.status == true &&
                        dateSetItem.line == "middle"
                      ) {
                        middleLineNumber = middleLineNumber + 1;
                      }
                      if (
                        middleLineNumber == 5 &&
                        dateSetItem.status == true &&
                        dateSetItem.line == "middle"
                      ) {
                        ticketDataItem.winnerTag = "middle_line";
                        // ticketDataItem.winnerPrize = getWinnerPrize(gameIdVar, "middle_line")
                        ticketDataItem.winnerPrize = "";
                        middleLineAssigned = true;
                      }
                    }
                    if (bottomLineAssigned == false) {
                      if (
                        dateSetItem.status == true &&
                        dateSetItem.line == "bottom"
                      ) {
                        bottomLineNumber = bottomLineNumber + 1;
                      }
                      if (
                        bottomLineNumber == 5 &&
                        dateSetItem.status == true &&
                        dateSetItem.line == "bottom"
                      ) {
                        ticketDataItem.winnerTag = "bottom_line";
                        // ticketDataItem.winnerPrize = getWinnerPrize(gameIdVar, "bottom_line")
                        ticketDataItem.winnerPrize = "";
                        bottomLineAssigned = true;
                      }
                    }
                    if (
                      fullHouseCount == 0 &&
                      ticketDataItem.winnerTag != "firstFullHouse"
                    ) {
                      if (dateSetItem.status == true) {
                        firstFullHouseNumber = firstFullHouseNumber + 1;
                      }
                      if (
                        firstFullHouseNumber == 15 &&
                        dateSetItem.status == true
                      ) {
                        ticketDataItem.winnerTag = "firstFullHouse";
                        // ticketDataItem.winnerPrize = getWinnerPrize(gameIdVar, "firstFullHouse")
                        ticketDataItem.winnerPrize = "";
                        fullHouseCount = fullHouseCount + 1;
                      }
                    }
                    if (
                      fullHouseCount == 1 &&
                      ticketDataItem.winnerTag != "secondFullHouse"
                    ) {
                      if (dateSetItem.status == true) {
                        secondFullHouseNumber = secondFullHouseNumber + 1;
                      }
                      if (
                        secondFullHouseNumber == 15 &&
                        dateSetItem.status == true
                      ) {
                        ticketDataItem.winnerTag = "secondFullHouse";
                        // ticketDataItem.winnerPrize = getWinnerPrize(gameIdVar, "secondFullHouse")
                        ticketDataItem.winnerPrize = "";
                        fullHouseCount = fullHouseCount + 1;
                      }
                    }
                  });
                }
              });
              ref.set({
                game_id: gameIdVar,
                number_set: JSON.stringify(numberData),
                currentCalledNumber: randomNumber,
              });
              con.query(
                "UPDATE `tbl_game` SET `game_number_set`=?, `ticket_set`=? WHERE `game_id`=?",
                [
                  JSON.stringify(numberData),
                  JSON.stringify(ticketData),
                  gameIdVar,
                ]
              );
            } else {
              clearInterval(interval); // Stop the timer when 90 unique numbers are generated
              // console.log("Timer stopped.");
            }
          } 
          // Set a timer to call the function every 100 milliseconds
          const interval = setInterval(generateUniqueRandomNumber, 8000);
          ResponseHandler(res, true, "Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to..", result);
        }
      }
    }
  );
});

// const getWinnerPrize = async (gameId, gamePrizeType) => {
//   con.query('SELECT * FROM `tbl_game` WHERE game_id=? ',
//     [gameId],
//     function (error, result, fields) {
//       if (error) throw error;
//       console.log("pppp", result);
//       if (error) {
//         ResponseHandler(res, false, "Api Issue", result)
//       } else {
//         if (result) {
//           if (gamePrizeType == "quick_seven_prize") {
//             console.log("resultwinner", result, result[0].quick_seven_prize)
//             return result[0].quick_seven_prize;
//           }
//           if (gamePrizeType == "top_line_prize") {
//             console.log("resultwinner", result, result[0].top_line_prize)
//             return result[0].top_line_prize;
//           }
//           if (gamePrizeType == "middle_line_prize") {
//             console.log("resultwinner", result, result[0].middle_line_prize)
//             return result[0].middle_line_prize;
//           }
//           if (gamePrizeType == "bottom_line_prize") {
//             console.log("resultwinner", result, result[0].bottom_line_prize)
//             return result[0].bottom_line_prize;
//           }
//           // ResponseHandler(res, true, "success", result)
//         }
//       }
//     }
//   )
// }

// ::::::::::::::::::::::::::::::::::::::::: Edit Game

app.put("/editGame", async (req, res) => {
  con.query(
    "UPDATE `tbl_game` SET `game_name`=?, `game_start_date`=?, `game_start_time`=?, `game_maximum_ticket_sell`=?, `game_amount`=?, `game_quick_fire`=?, `game_star`=?, `game_top_line`=?, `game_middle_line`=?, `game_bottom_line`=?, `game_corner`=?, `game_half_sheet`=?, `game_housefull`=?, `game_status`=? WHERE `game_id`=?",
    [
      req.body.gameName,
      req.body.gameStartDate,
      req.body.gameStartTime,
      req.body.gameMaximumTicketSell,
      req.body.gameAmount,
      req.body.gameQuickFire,
      req.body.gameStar,
      req.body.gameTopLine,
      req.body.gameMiddleLine,
      req.body.gameBottomLine,
      req.body.gameCorner,
      req.body.gameHalfSheet,
      req.body.gameHousefull,
      req.body.gameStatus,
      req.body.gameId,
    ],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Update Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Update..", result);
        }
      }
    }
  );
});

// ::::::::::::::::::::::::::::::::::::::::: Delete Game
app.put("/deleteGame", async (req, res) => {
  con.query(
    "UPDATE `tbl_game` SET `game_status`=? WHERE `game_id`=?",
    [req.body.gameStatus, req.body.gameId],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Deleted Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Deleted", result);
        }
      }
    }
  );
});

// ::::::::::::::::::::::::::::::::::::::::: Announcement List
app.get("/announcementList", async (req, res) => {
  ex_query("SELECT * FROM tbl_announcement", req, res);
});

// ::::::::::::::::::::::::::::::::::::::::: Announcement active
app.get("/activeAnnouncement", async (req, res) => {
  ex_query(
    "SELECT * FROM tbl_announcement WHERE `announcement_status` = 'Active'",
    req,
    res
  );
});

// ::::::::::::::::::::::::::::::::::::::::: Save Announcement
app.post("/saveAnnouncement", async (req, res) => {
  con.query(
    "INSERT INTO `tbl_announcement` SET `announcement_title`=?, `announcement_message`=?, `announcement_status`=?",
    [
      req.body.announcementTitle,
      req.body.announcementMessage,
      req.body.announcementStatus,
    ],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Save Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Save..", result);
        }
      }
    }
  );
});

// ::::::::::::::::::::::::::::::::::::::::: Edit Announcement
app.put("/editAnnouncement", async (req, res) => {
  con.query(
    "UPDATE `tbl_announcement` SET `announcement_title`=?, `announcement_message`=?, `announcement_status`=? WHERE `announcement_id`=?",
    [
      req.body.announcementTitle,
      req.body.announcementMessage,
      req.body.announcementStatus,
      req.body.announcementId,
    ],
    function (error, result, fields) {
      if (error) throw error;
      // console.log("pppp", result);
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Update Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Update..", result);
        }
      }
    }
  );
});

// ::::::::::::::::::::::::::::::::::::::::: Delete Announcement
app.put("/deleteAnnouncement", async (req, res) => {
  con.query(
    "UPDATE `tbl_announcement` SET `announcement_status`=? WHERE `announcement_id`=?",
    [req.body.announcementStatus, req.body.announcementId],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Deleted Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Deleted", result);
        }
      }
    }
  );
});

// ::::::::::::::::::::::::::::::::::::::::: Disclaimer List
app.get("/disclaimerList", async (req, res) => {
  ex_query("SELECT * FROM tbl_disclaimer", req, res);
});

// ::::::::::::::::::::::::::::::::::::::::: Edit Disclaimer
app.put("/editDisclaimer", async (req, res) => {
  con.query(
    "UPDATE `tbl_disclaimer` SET `disclaimer_title`=?, `disclaimer_message`=?, `disclaimer_status`=? WHERE `disclaimer_id`=?",
    [
      req.body.disclaimerTitle,
      req.body.disclaimerMessage,
      req.body.disclaimerStatus,
      req.body.disclaimerId,
    ],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Update Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Update..", result);
        }
      }
    }
  );
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //
// ::::::::::::::::::::::::::::::::::::: || agents api || :::::::::::::::::::::::::::::::::::::: //
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// ::::::::::::::::::::::::::::::::::::::::: admin api code // not working for now let us see at the end
app.post("/agentLogin", async (req, res) => {
  con.query(
    // "SELECT * FROM `tbl_agents` Where `agents_email`=? AND `agents_password`=? AND `agents_active_status`='Active'",
    "SELECT * FROM `tbl_agents` Where `agents_email`=? AND `agents_password`=?",
    [req.body.username, req.body.password],
    function (error, result, fields) {
      if (error) throw error;
      // console.log(result);
      if (error) {
        ResponseHandler(res, false, "Api issue", result);
      } else {
        if (result.length > 0) {
          ResponseHandler(res, true, "Login Successful", result);
        } else {
          ResponseHandler(res, false, "Login Failed", result);
        }
      }
    }
  );
});

// ::::::::::::::::::::::::::::::::::::: View Ticket For Agents
app.post("/viewTicketForAgents", async (req, res) => {
  // con.query("SELECT * FROM tbl_ticket WHERE game_id=?", [req.body.gameId],
  // console.log("reqviewticketforagent", req);
  con.query(
    "SELECT * FROM tbl_game WHERE game_id=?",
    [req.body.gameId],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Fetch Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Deleted", result);
        }
      }
    }
  );
});

// ::::::::::::::::::::::::::::::::::::: Book Ticket By Agents
app.post("/bookTicketByAgents", async (req, res) => {
  con.query(
    "SELECT * FROM tbl_game WHERE game_id=?",
    [req.body.gameId],
    function (error, result, fields) {
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          // console.log("resultresult", result[0].ticket_set);
          // console.log("resulttttw", req.body.selectedIdsForTicketBooking, result);
          let lastTicket = JSON.parse(result[0].ticket_set);
          // console.log("lastTickettttt", lastTicket);
          // let selectedTicket = JSON.stringify(req.body.selectedIdsForTicketBooking)
          let selectedTicket = JSON.parse(req.body.selectedIdsForTicketBooking);
          // console.log("adsdfasdf1", selectedTicket, lastTicket);
          selectedTicket.map((selectedTicketItem, selectedTicketIndex) => {
            // console.log("adsdfasdf2", selectedTicketItem, lastTicket);
            lastTicket?.map((lastTicketItem, lastTicketIndex) => {
              // console.log("adsdfasdf3", lastTicketItem);
              if (lastTicketItem.id == selectedTicketItem) {
                // console.log("adsdfasdf4");
                (lastTicketItem.agentId = "2"),
                  (lastTicketItem.userName = req.body.userName),
                  (lastTicketItem.userPhone = req.body.userPhone),
                  (lastTicketItem.bookingDateAndTime = new Date().getTime());
              }
            });
          });
          const lastTicketString = JSON.stringify(lastTicket);
          console.log("selectedTicketttttapi", lastTicket, lastTicketString);
          // console.log("selectedTicketttttapiString", lastTicketString);

          con.query(
            "UPDATE `tbl_game` SET `ticket_set`=? WHERE `game_id`=?",
            [lastTicketString, req.body.gameId],
            function (error, result, fields) {
              // if (error) throw error;
              if (error) {
                ResponseHandler(res, false, "Api Issue", result);
              } else {
                if (result) {
                  // console.log("first", result)
                  ResponseHandler(
                    res,
                    true,
                    "Ticket Booked Successfully..",
                    result
                  );
                } else {
                  ResponseHandler(
                    res,
                    false,
                    "Sorry., Unable to Booked Ticket",
                    result
                  );
                }
              }
            }
          );
          // console.log("second")
          // ResponseHandler(res, true, "Fetch Successfully..", result);
        }
      }
    }
  );
});

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: website api
app.post("/ticketCardViewForUser", async (req, res) => {
  con.query(
    "SELECT * FROM tbl_game WHERE game_id=?",
    [req.body.gameId],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Fetch Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Deleted", result);
        }
      }
    }
  );
});

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: website api
app.post("/agentDetails", async (req, res) => {
  con.query(
    "SELECT * FROM tbl_agents WHERE agents_id=?",
    [req.body.agent_id],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Fetch Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Deleted", result);
        }
      }
    }
  );
});

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: website api
app.post("/agentPaidAmount", async (req, res) => {
  con.query(
    "UPDATE `tbl_agents` SET `wallet`=? WHERE `agents_id`=?",
    [req.body.amount, req.body.agent_id],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Update Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Deleted", result);
        }
      }
    }
  );
});

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: website api
app.post("/agentCreditDebitTransacationList", async (req, res) => {
  con.query(
    "SELECT * FROM tbl_transection WHERE agents_id=?",
    [req.body.agentId],
    // "SELECT * FROM `tbl_transection` WHERE `type_cr_dr` = 'Debit' AND `type_cr_dr` = 'Credit' AND `agents_id` =?",
    // [req.body.agentId],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Fetch Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Deleted", result);
        }
      }
    }
  );
});

// ::::::::::::::::::::::::::::::::::::::::: Add Wallet Action
app.post("/walletAction", async (req, res) => {
  con.query(
    "INSERT INTO `tbl_transection` SET `agents_id`=?, `type_cr_dr`=?, `remarks`=?,`amount`=?",
    [
      req.body.agentId,
      req.body.transactionType,
      req.body.remarks,
      req.body.amount,
    ],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Save Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Save..", result);
        }
      }
    }
  );
});

app.put("/acceptTransactionRequest", async (req, res) => {
  con.query(
    "UPDATE `tbl_transection` SET `status`=?, `updated_at`=? WHERE `payment_id`=?",
    [req.body.status, req.body.updatedAt, req.body.id],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Update Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Update..", result);
        }
      }
    }
  );
});

app.get("/getGameIdAndGameNameForUser", async (req, res)=>{
  ex_query("SELECT * FROM `tbl_game`",req,res);
})

app.post("/getGameDetailsForUser", async (req, res) => {
  con.query(
    // "SELECT * FROM tbl_game WHERE game_id=? AND game_name=?",
    "SELECT * FROM tbl_game WHERE game_name=?",
    [req.body.gameName],
    function (error, result, fields) {
      if (error) throw error;
      if (error) {
        ResponseHandler(res, false, "Api Issue", result);
      } else {
        if (result) {
          ResponseHandler(res, true, "Fetch Successfully..", result);
        } else {
          ResponseHandler(res, false, "Sorry., Unable to Deleted", result);
        }
      }
    }
  );
});

app.listen(8000, function () {
  console.log("Server is up and Rudding on port 8000!");
});
